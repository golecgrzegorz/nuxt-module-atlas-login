import { $fetch } from 'ofetch';

export const refreshToken = (refreshToken: string) => {
  const url = 'https://realm.mongodb.com/api/client/v2.0/auth/session'
  return $fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${refreshToken}`,
    },
    method: 'post',
  })
}
