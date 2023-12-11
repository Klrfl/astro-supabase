import { type APIRoute } from "astro";
import { createClient } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString()!;
  const email = formData.get("email")?.toString()!;
  const password = formData.get("password")?.toString()!;

  const supabase = createClient(cookies);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name,
      },
    },
  });

  if (error) return new Response(error.message, { status: 500 });
  if (data) return redirect("/success");
};
