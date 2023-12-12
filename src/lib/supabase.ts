import {
  createServerClient,
  createBrowserClient,
  type CookieOptions,
} from "@supabase/ssr";

const supabaseURL = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const createClient = (cookies: any) => {
  return createServerClient(supabaseURL, supabaseAnonKey, {
    cookies: {
      get(key: string) {
        return cookies.get(key)?.value;
      },
      set(key: string, value: string, options: CookieOptions) {
        return cookies.set(key, value, options);
      },
      remove(key: string, options) {
        cookies.delete(key, options);
      },
    },
  });
};

export const createUsualClient = () => {
  return createBrowserClient(supabaseURL, supabaseAnonKey);
};
