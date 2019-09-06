
echo 'loading setting for environment '$NODE_ENV

pwd
cp ./static/settings/$NODE_ENV.js ./static/settings.js

npm run start
