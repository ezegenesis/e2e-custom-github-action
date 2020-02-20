# E2E Custom Github Action

This action runs cypress e2e tests and reports to slack.

## Inputs

#### `slack_client_id`
#### `slack_client_secret`
#### `slack_verification_token`
#### `slack_auth_token`

## Example usage

```
- name: Build app and run e2e tests
  uses: enle-org/mobile-deploy-action@master
  with:
    slack_client_id: ${{ secrets.SLACK_CLIENT_ID }}
    slack_client_secret: ${{ secrets.SLACK_CLIENT_SECRET }}
    slack_verification_token: ${{ secrets.SLACK_VERIFICATION_TOKEN }}
    slack_auth_token: ${{ secrets.SLACK_AUTH_TOKEN }}
```