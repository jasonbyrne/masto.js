import type { MastoClient } from '../src/entrypoints/nodejs';
import { login as originalLogin } from '../src/entrypoints/nodejs';

interface Options {
  unauthenticated?: boolean;
}

export const login = (options?: Options): Promise<MastoClient> => {
  const unauthenticated = options?.unauthenticated;

  return originalLogin({
    timeout: 1000 * 30,
    url: process.env.MASTODON_URL as string,
    accessToken: !unauthenticated
      ? (process.env.MASTODON_TOKEN as string)
      : undefined,
  });
};
