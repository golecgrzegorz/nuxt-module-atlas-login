import * as jwtDecode from 'jwt-decode';
import type { AtlasSession, AtlasSessionDescriptor } from './atlas/types';

import { refreshToken } from './atlas/access-token-refresh';

const SESSION_KEY = 'atlas_session';
const SESSION_REMEMBER_KEY = 'atlas_session_remember';
export const useAtlasSession = () => {

  const rememberSession = ref(false);
  const sessionStore = useState('session');

  if (window?.localStorage.getItem(SESSION_KEY)) {
    sessionStore.value = JSON.parse(window.localStorage.getItem(SESSION_KEY));
  }

  if (window?.localStorage.getItem(SESSION_REMEMBER_KEY)) {
    rememberSession.value = window.localStorage.getItem(SESSION_REMEMBER_KEY) === 'true';
  }

  const refreshOutdatedToken = async () => {
    if (sessionStore.value?.session?.refresh_token) {
      try {
        const oldSession = toRaw(sessionStore.value);
        const refreshResponse = await refreshToken(oldSession.session.refresh_token);
        setSession(Object.assign(oldSession.session, refreshResponse));

        return true;
      } catch (error) {
        console.error('>>> ERR :: refreshOutdatedToken', error);
        return false;
      }
    } else {
      localStorage.removeItem('session');
      sessionStore.value = undefined;
      return false;
    }
  }

  const isAuthenticated = async () => {
    if (!sessionStore.value?.expireAt) {
      return false;
    }

    if (new Date() < new Date(sessionStore.value.expireAt)) {
      return true;
    } else {
      if (rememberSession.value) {
        return await refreshOutdatedToken();
      } else {
        return false;
      }
    }
  }

  const setSession = (session: AtlasSession) => {
    try {
      const decoded = jwtDecode.jwtDecode(session.access_token);

      const sessionDetails = {
        session,
        expireAt: decoded.exp*1000,
        userData: decoded.user_data
      };

      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionDetails));
      sessionStore.value = sessionDetails;
    } catch (error) {
      console.error('>>> ERR :: setSession', error);
    }
  }

  const getSession = () => <AtlasSessionDescriptor>sessionStore.value;

  const clearSession = () => {
    localStorage.removeItem(SESSION_KEY);
    clearNuxtState(SESSION_KEY);
  }

  const getAccessToken = async () => {
    if (new Date() > new Date(sessionStore.value.expireAt)) {
      await refreshOutdatedToken();
    }

    const { session: { access_token: authorizationHeader }} = getSession();
    return authorizationHeader;
  }

  const getRefreshToken = () => {
    const { session: { refresh_token }} = getSession();
    return refresh_token;
  }

  const getUserId = () => {
    const currentSession = getSession();
    return currentSession.session?.user_id;
  }

  return {
    clearSession,
    getAccessToken,
    getRefreshToken,
    getSession,
    setSession,
    getUserId,
    isAuthenticated,
  };
}
