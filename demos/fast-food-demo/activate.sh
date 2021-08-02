#!/bin/bash

if [ -z "$1" ]
  then
    echo "ERROR: Missing variant name to be activated, e.g. 'en' or 'fi'"
    exit 1
fi
echo "Activating environment '$1'..."

ENV_FILE=env/$1.env
if [ ! -f "$ENV_FILE" ]; then
    echo "ERROR: variant environment file '$ENV_FILE' does not exist"
    exit 1
fi

# Set active configuration
rm .env.local
ln -sv $ENV_FILE .env.local

# Export environment values
# set -o allexport
source .env.local
# set +o allexport 
# export $(cat .env.local | xargs)

if [ -z "$REACT_APP__DELI_VARIANT_ID" ]
  then
    echo "ERROR: Environment variable REACT_APP__DELI_VARIANT_ID needs to be set either in the shell or in .env.local file"
    exit 1
fi


VARIANTS=variants/$REACT_APP__DELI_VARIANT_ID
if [ ! -d "$VARIANTS" ]; then
    echo "ERROR: variants directory '$VARIANTS' does not exist"
    exit 1
fi

# Link public dir
rm public
ln -sv $VARIANTS/public public

# Link files in src/customization. WebPack won't like symlinks in src, thus hard linking
# src/customization is excluded in .gitignore
# Hard linking ensures that changes are saved in variants directory
rm -rf src/customization
mkdir src/customization
mkdir src/customization/components
mkdir src/customization/data
ln -v $VARIANTS/src-customization/components/* src/customization/components
ln -v $VARIANTS/src-customization/data/* src/customization/data

echo "SUCCESS. Activated environment '$1' - ready to run the scripts:"
echo "'pnpm run updateconfig'"
echo "'pnpm run testconfig'"
echo "'pnpm start'"
