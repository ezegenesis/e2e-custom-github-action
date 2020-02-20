const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

try {
  const SLACK_CLIENT_ID = core.getInput('slack_client_id');
  const SLACK_CLIENT_SECRET	= core.getInput('slack_client_secret');
  const SLACK_VERIFICATION_TOKEN = core.getInput('slack_verification_token');
  const SLACK_AUTH_TOKEN = core.getInput('slack_auth_token');

  exec.exec(`yarn`)
    .then(() => exec.exec(`yarn dev-core-ezepro`))
    .catch(e => core.setFailed(e));

    // exec.exec(`yarn`)
    //   .catch(e => core.setFailed(e));
    
} catch (error) {
  core.setFailed(error.message);
}
