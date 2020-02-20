const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

try {
  const SLACK_CLIENT_ID = core.getInput('slack_client_id');
  const SLACK_CLIENT_SECRET	= core.getInput('slack_client_secret');
  const SLACK_VERIFICATION_TOKEN = core.getInput('slack_verification_token');
  const SLACK_AUTH_TOKEN = core.getInput('slack_auth_token');

  exec.exec(`yarn`)
    .then(() => exec.exec(`yarn global add expo-cli`))
    .then(() => exec.exec(`yarn global add firebase-tools`))
    .then(() => exec.exec(`yarn run expo login -u ${EXPO_USERNAME} -p ${EXPO_PASSWORD}`))
    .then(() => exec.exec(`yarn build:android`))
    .then(() => exec.exec(`tail -n 2 ./output.txt | head -n 1 | cut -c47- | xargs wget -O build.apk`))
    .then(() => exec.exec(`firebase appdistribution:distribute ./build.apk --app ${FIREBASE_ANDROID_APP_ID} --groups internal --token ${FIREBASE_TOKEN}`))
    .catch(e => core.setFailed(e));
    
} catch (error) {
  core.setFailed(error.message);
}
