import { $fetch } from 'ofetch';

export const resetFinish = async (token: string, tokenId: string, password: string) => {
  const url = new URL(
    '/api/client/v2.0/app/application-0-vcbyu/auth/providers/local-userpass/reset',
    'https://westeurope.azure.services.cloud.mongodb.com',
  )

  return $fetch.raw(url, {
    body: JSON.stringify({
      token,
      tokenId,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    ignoreResponseError: true,
  })
}
