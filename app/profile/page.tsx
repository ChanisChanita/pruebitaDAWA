import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Perfil</h1>

      <p>Nombre: {session.user?.name}</p>
      <p>Email: {session.user?.email}</p>

      {session.user?.image && (
        <Image
          src={session.user.image}
          width={100}
          height={100}
          alt="profile"
          className="rounded-full mt-4"
        />
      )}
    </div>
  );
}
