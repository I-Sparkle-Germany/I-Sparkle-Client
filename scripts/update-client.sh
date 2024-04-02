#!/bin/bash

# Use this script to update the server with the latest from the develop branch.
# Your current directory must be the scripts folder when you run the script.

if [ "$#" -ne 2 ]; then
  echo "Error: Server key, username and address required"
  echo "Example: ./update-client.sh path-to-pem-key ubuntu@server.com"
  exit 1
fi

KEY_PATH="$1"
SERVER_ADDRESS="$2"

echo "Changing directory to project root"
cd ..

echo "Pulling latest code from develop branch"
git checkout develop
git pull

npm ci
if [ $? -ne 0 ]; then
  echo "Error running 'npm ci'. Aborting update."
  exit 1
fi

npm run build-prod
if [ $? -ne 0 ]; then
  echo "Error running 'npm run build-prod'. Aborting update."
  exit 1
fi

echo "Changing directory to dist"
cd dist

for d in */ ; do
  # get the directory name without the ending slash
  dir_name="${d%/}"
  echo "Creating $dir_name.tar.gz"
  tar -czf "$dir_name.tar.gz" "$dir_name"
done

echo "Copying *.tar.gz files to server"
scp -i $KEY_PATH *.tar.gz $SERVER_ADDRESS:./builds

echo "Running deploy-client.sh script on server"
ssh -i $KEY_PATH $SERVER_ADDRESS "sudo ~/scripts/deploy-client.sh"

