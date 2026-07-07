#!/usr/bin/env python3
"""
optimize-images.py
Batch image optimization for Sawla Tours

This script:
1. Scans public/images for all JPG/PNG files
2. Resizes to 4 standard sizes (hero, card, body, portrait)
3. Generates JPG (80% quality) and WebP (75% quality) variants
4. Preserves folder structure
5. Logs optimization results

Usage:
  python scripts/optimize-images.py
  python scripts/optimize-images.py --input public/images --output public/images --verbose
  python scripts/optimize-images.py --single "public/images/destinations/lalibela/source.jpg"
"""

import os
import sys
import json
from pathlib import Path
from PIL import Image
import argparse
from datetime import datetime

# Image size presets (width, height, name)
SIZE_PRESETS = {
    'hero': (1920, 1080),           # 16:9 for hero banners, hub pages
    'hero-poster': (1920, 1080),    # Same as hero (for video posters)
    'card': (400, 300),              # 4:3 for hub tiles, grids
    'portrait': (400, 400),          # 1:1 for species, team members
    'body': (800, 600),              # 4:3 for article detail images
    'section': (1200, 800),          # 3:2 for full-width sections
}

# Quality settings
QUALITY_JPG = 80
QUALITY_WEBP = 75

# Logging
LOG_FILE = 'image-optimization.log'

class ImageOptimizer:
    def __init__(self, verbose=False):
        self.verbose = verbose
        self.log = []
        self.stats = {
            'processed': 0,
            'skipped': 0,
            'errors': 0,
            'total_input_kb': 0,
            'total_output_kb': 0,
        }

    def log_message(self, msg, level='INFO'):
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        log_entry = f'[{timestamp}] {level}: {msg}'
        self.log.append(log_entry)
        if self.verbose or level != 'DEBUG':
            print(log_entry)

    def get_target_size(self, filename):
        """Infer size preset from filename or parent directory."""
        fname_lower = filename.lower()

        # Check filename patterns
        if 'hero' in fname_lower:
            return 'hero'
        elif 'card' in fname_lower:
            return 'card'
        elif 'portrait' in fname_lower:
            return 'portrait'
        elif 'body' in fname_lower:
            return 'body'
        elif 'section' in fname_lower or 'cta' in fname_lower:
            return 'section'

        # Default to hero for unspecified files
        return 'hero'

    def optimize_image(self, input_path, size_preset='hero'):
        """Optimize a single image to target size."""
        try:
            if not os.path.exists(input_path):
                self.log_message(f'File not found: {input_path}', 'ERROR')
                self.stats['errors'] += 1
                return None

            # Open and validate
            img = Image.open(input_path)
            if img.format not in ('JPEG', 'PNG', 'WEBP'):
                self.log_message(f'Unsupported format: {input_path}', 'WARN')
                self.stats['skipped'] += 1
                return None

            # Get target dimensions
            if size_preset not in SIZE_PRESETS:
                self.log_message(f'Unknown size preset: {size_preset}', 'WARN')
                size_preset = 'hero'

            target_w, target_h = SIZE_PRESETS[size_preset]

            # Convert RGBA to RGB for JPG
            if img.mode in ('RGBA', 'LA', 'P'):
                rgb_img = Image.new('RGB', img.size, (255, 255, 255))
                rgb_img.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = rgb_img

            # Resize with aspect ratio preservation
            img.thumbnail((target_w, target_h), Image.Resampling.LANCZOS)

            # Pad to exact size if needed (maintain aspect)
            final = Image.new('RGB', (target_w, target_h), (255, 255, 255))
            offset = ((target_w - img.width) // 2, (target_h - img.height) // 2)
            final.paste(img, offset)

            # Generate output paths
            base_path = str(input_path).rsplit('.', 1)[0]
            jpg_path = f'{base_path}.jpg'
            webp_path = f'{base_path}.webp'

            # Save JPG
            final.save(jpg_path, 'JPEG', quality=QUALITY_JPG, optimize=True)
            jpg_size = os.path.getsize(jpg_path) / 1024

            # Save WebP
            final.save(webp_path, 'WEBP', quality=QUALITY_WEBP, method=6)
            webp_size = os.path.getsize(webp_path) / 1024

            # Get input size
            input_size = os.path.getsize(input_path) / 1024

            self.stats['processed'] += 1
            self.stats['total_input_kb'] += input_size
            self.stats['total_output_kb'] += jpg_size + webp_size

            self.log_message(
                f'✓ {os.path.basename(input_path)} → {size_preset} '
                f'({target_w}×{target_h}): '
                f'JPG {jpg_size:.0f}KB, WebP {webp_size:.0f}KB '
                f'(input: {input_size:.0f}KB)',
                'INFO'
            )

            return {
                'original': input_path,
                'jpg': jpg_path,
                'webp': webp_path,
                'preset': size_preset,
                'dimensions': (target_w, target_h),
                'sizes': {
                    'input_kb': input_size,
                    'jpg_kb': jpg_size,
                    'webp_kb': webp_size,
                },
            }

        except Exception as e:
            self.log_message(f'Error processing {input_path}: {str(e)}', 'ERROR')
            self.stats['errors'] += 1
            return None

    def process_directory(self, input_dir='public/images'):
        """Recursively process all images in a directory."""
        results = []

        if not os.path.isdir(input_dir):
            self.log_message(f'Directory not found: {input_dir}', 'ERROR')
            return results

        self.log_message(f'Starting image optimization in {input_dir}')
        self.log_message(f'Quality settings: JPG={QUALITY_JPG}%, WebP={QUALITY_WEBP}%')

        # Find all image files
        image_extensions = ('*.jpg', '*.jpeg', '*.png', '*.webp')
        all_files = []

        for ext in image_extensions:
            all_files.extend(Path(input_dir).rglob(ext))
            all_files.extend(Path(input_dir).rglob(ext.upper()))

        self.log_message(f'Found {len(all_files)} image files')

        for file_path in sorted(all_files):
            size_preset = self.get_target_size(file_path.name)
            result = self.optimize_image(str(file_path), size_preset)
            if result:
                results.append(result)

        self.print_summary()
        self.save_log()

        return results

    def process_single_file(self, file_path, size_preset=None):
        """Process a single file."""
        if not size_preset:
            size_preset = self.get_target_size(os.path.basename(file_path))

        self.log_message(f'Processing single file: {file_path}')
        result = self.optimize_image(file_path, size_preset)
        self.print_summary()
        self.save_log()
        return result

    def print_summary(self):
        """Print optimization summary."""
        print('\n' + '='*60)
        print('IMAGE OPTIMIZATION SUMMARY')
        print('='*60)
        print(f'Processed:        {self.stats["processed"]} images')
        print(f'Skipped:          {self.stats["skipped"]} images')
        print(f'Errors:           {self.stats["errors"]} images')
        print(f'Input total:      {self.stats["total_input_kb"]:.0f} KB')
        print(f'Output total:     {self.stats["total_output_kb"]:.0f} KB')
        if self.stats['total_input_kb'] > 0:
            compression = (1 - self.stats['total_output_kb'] / self.stats['total_input_kb']) * 100
            print(f'Compression:      {compression:.1f}%')
        print('='*60 + '\n')

    def save_log(self):
        """Save log to file."""
        with open(LOG_FILE, 'w') as f:
            f.write('\n'.join(self.log))
        self.log_message(f'Log saved to {LOG_FILE}')


def main():
    parser = argparse.ArgumentParser(
        description='Optimize images for Sawla Tours website'
    )
    parser.add_argument(
        '--input',
        default='public/images',
        help='Input directory (default: public/images)'
    )
    parser.add_argument(
        '--single',
        help='Process a single file instead of directory'
    )
    parser.add_argument(
        '--size',
        choices=list(SIZE_PRESETS.keys()),
        help='Size preset for single file'
    )
    parser.add_argument(
        '--verbose', '-v',
        action='store_true',
        help='Verbose output'
    )

    args = parser.parse_args()

    optimizer = ImageOptimizer(verbose=args.verbose)

    if args.single:
        optimizer.process_single_file(args.single, args.size)
    else:
        optimizer.process_directory(args.input)


if __name__ == '__main__':
    main()
