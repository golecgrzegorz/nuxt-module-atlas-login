import type { FetchResponse } from 'ofetch';
import { invalidateToken } from './atlas/access-token-invalidate';
import { loginEmailPassword } from './atlas/login-email-password';
import { loginCustomJwt } from './atlas/login-custom-jwt';
import { resetEmailPassword } from './atlas/reset';
import { resetFinish } from './atlas/reset-finish';
import { refreshToken } from './atlas/access-token-refresh';
import { registerEmailPassword } from './atlas/register';

interface AtlasEmailPasswordMethods {
  invalidateToken(): Promise<FetchResponse<Record<string, any>>>;
  loginEmailPassword(): Promise<FetchResponse<Record<string, any>>>;
  loginCustomJwt(): Promise<FetchResponse<Record<string, any>>>;
  resetEmailPassword(): Promise<FetchResponse<Record<string, any>>>;
  resetFinish(): Promise<FetchResponse<Record<string, any>>>;
  refreshToken(): Promise<FetchResponse<Record<string, any>>>;
  registerEmailPassword(): Promise<FetchResponse<Record<string, any>>>;
}

export const useAtlas = () => <AtlasEmailPasswordMethods>({
  invalidateToken,
  loginEmailPassword,
  loginCustomJwt,
  resetEmailPassword,
  resetFinish,
  refreshToken,
  registerEmailPassword
})
