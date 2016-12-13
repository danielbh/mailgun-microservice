#!/bin/bash

npm run pre
# If a message has been passed add and commit changes
if [ $# -eq 1 ]
    then
       git add .
       git commit -m "$1"
fi
git push dokku