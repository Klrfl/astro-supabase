// middleware!!!!
import { defineMiddleware } from "astro:middleware";
import { createClient } from "../lib/supabase";

const protectedRoutes = ["/guestbook", "/account"];
const redirectRoutes = ["/sign-in", "/register", "/success"];

export const onRequest = defineMiddleware(
  async ({ cookies, url, redirect, locals }, next) => {
    const supabase = createClient(cookies);
    const { data, error } = await supabase.auth.getSession();
    if (error) console.error(error.message);

    const session = data.session;
    if (session) {
      locals.user = session.user;
    } else {
      locals.user = null;
    }

    if (protectedRoutes.includes(url.pathname) && !session) {
      return redirect("/sign-in");
    }

    if (redirectRoutes.includes(url.pathname) && session) {
      return redirect("/account");
    }

    return next();
  },
);
