import OneGraphAuth from 'onegraph-auth'

export const APP_ID = `3e8f3dad-e314-4275-899e-614d6a2dd47d`

export const CLIENT_URL = `https://serve.onegraph.com/graphql?app_id=${APP_ID}`;

export const auth = new OneGraphAuth({
  appId: APP_ID
})