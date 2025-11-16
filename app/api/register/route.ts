import { createUser } from "@/lib/users";

export async function POST(req: Request) {
  const body = await req.json();
  await createUser(body.name, body.email, body.password);
  return new Response("Usuario registrado correctamente");
}
