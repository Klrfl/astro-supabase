import { type APIRoute } from "astro";
import { createClient } from "../../../lib/supabase";

async function getUser(supabase) {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export const POST: APIRoute = async ({ cookies, redirect }) => {
  const supabase = createClient(cookies);

  const session = await getUser(supabase);
  const { error } = await supabase.auth.admin.deleteUser(session.user.id);

  if (error) return new Response(error.message, { status: 500 });
  return redirect("/sign-in");
};
