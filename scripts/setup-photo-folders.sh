#!/bin/bash
# setup-photo-folders.sh
# Creates the complete Sawla Tours photography folder structure

set -e

echo "═══════════════════════════════════════════════════════════"
echo "Sawla Tours — Photography Folder Structure Setup"
echo "═══════════════════════════════════════════════════════════"

BASE_DIR="public/images"

echo "Creating base directories..."
mkdir -p "$BASE_DIR"/{destinations,tours,species,guides,moments,people,camps,pages,hubs,maps}

echo "Creating destination subdirectories (8 total)..."
mkdir -p "$BASE_DIR/destinations"/{lalibela,simien-mountain-national-park,danakil-depression-tour-packages,omo-valley-tribes,bale-mountains-national-park,addis-ababa,harar,tigray-rock-churches}

echo "Creating tour style directories (6 total)..."
mkdir -p "$BASE_DIR/tours/hubs"
mkdir -p "$BASE_DIR/tours/itineraries"

echo "Creating species directories (7 total)..."
mkdir -p "$BASE_DIR/species"/{gelada-monkey,ethiopian-wolf,walia-ibex,abyssinian-ground-hornbill,lammergeier,menelik-bushbuck,simien-jackal}

echo "Creating field guide directories (15 total)..."
for i in {1..15}; do
  mkdir -p "$BASE_DIR/guides"
done

echo "Creating people subdirectories..."
mkdir -p "$BASE_DIR/people"/{team,founders,guides,drivers,specialists,portraits}

echo "Creating page subdirectories..."
mkdir -p "$BASE_DIR/pages"/{about,why-travel,how-we-work,responsible,contact}

echo ""
echo "Directory structure created successfully!"
echo ""
echo "Next steps:"
echo "1. Copy raw photos into respective folders matching the naming convention"
echo "2. Run: python scripts/optimize-images.py"
echo "3. Update data/photoMetadata.ts with image details"
echo "4. Update components to use real images instead of PlaceholderImage"
echo ""
echo "Photography System documentation: PHOTOGRAPHY_SYSTEM.md"
echo "═══════════════════════════════════════════════════════════"
