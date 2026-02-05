"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signUpAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  try {
    await auth.api.signUpEmail({
      body: { email, password, name },
    });

    redirect("/");
  } catch (err: any) {
    // return { error: err.message || "Signup failed" };
  }
}

export async function signInAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await auth.api.signInEmail({ body: { email, password } });
    redirect("/");
  } catch (err: any) {
    // return { error: err.message || "Signin failed" };
  }
}

export async function signOutAction() {
  try {
    await auth.api.signOut({ headers: await headers() });
    redirect("/");
  } catch (err: any) {
    return { error: err.message || "Signout failed" };
  }
}
