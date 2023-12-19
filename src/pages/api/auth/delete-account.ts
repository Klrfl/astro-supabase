import { type APIRoute } from "astro";
import { createClient } from "../../../lib/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

async function getUser(supabase: SupabaseClient) {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export const POST: APIRoute = async ({ cookies, redirect }) => {
  const supabase = createClient(cookies);

  const session = await getUser(supabase);
  if (!session)
    return new Response("you're not logged in or something man", {
      status: 500,
    });
  const { error } = await supabase.auth.admin.deleteUser(session.user.id);

  if (error) return new Response(error.message, { status: 500 });
  return redirect("/sign-in");
};
