import { type APIRoute } from "astro";
import { createClient } from "../../../lib/supabase";

export const POST: APIRoute = async ({ cookies, redirect }) => {
  const supabase = createClient(cookies);

  const { error } = await supabase.auth.signOut();
  if (error) return new Response(error.message, { status: 500 });
  return redirect("/sign-in");
};
