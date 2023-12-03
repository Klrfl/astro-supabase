import { type APIRoute } from "astro";
import { createClient } from "../../../lib/supabase"

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString()!;
  const password = formData.get("password")?.toString()!;

  const supabase = createClient(cookies)
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })
  console.log(data)

  if (error) return new Response(error.message, { status: 500 });

  if (data) return redirect("/sign-in")

}
