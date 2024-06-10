export interface AtlasSession {
  access_token: string;
  device_id: string;
  refresh_token: string;
  user_id: string;
}

export interface AtlasSessionDescriptor {
  expireAt: number;
  session: AtlasSession;
  userData: Record<string, string | number>
}
