#!/bin/bash

echo \\nInstalling Server dependencies...\\n
  cd server && npm install
echo \\nSuccessfully installed server dependencies.\\n

echo \\nInstalling Client dependencies...\\n
  cd ../client && npm install
echo \\nSuccessfully installed client dependencies.\\n
