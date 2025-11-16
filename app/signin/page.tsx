"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: e.target.email.value,
      password: e.target.password.value,
      redirect: false,
    });

    if (res?.error) {
      alert(res.error);
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Iniciar Sesión</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          className="border p-2 w-full mb-2"
          placeholder="Email"
        />

        <input
          name="password"
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Contraseña"
        />

        <button className="bg-black text-white w-full p-2 mb-4">
          Ingresar
        </button>
      </form>

      <button
        onClick={() => signIn("google")}
        className="bg-red-500 text-white w-full p-2 mb-2"
      >
        Google
      </button>

      <button
        onClick={() => signIn("github")}
        className="bg-gray-700 text-white w-full p-2"
      >
        GitHub
      </button>
    </div>
  );
}
