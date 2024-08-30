"use server";

import { authProcedure } from "@/procedures/auth";
import { lucia } from "@/lib/auth/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logoutAction = authProcedure
  .createServerAction()
  .handler(async () => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value;

    if (!sessionId) {
      return redirect("/login");
    }

    await lucia.invalidateSession(sessionId);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/login");
  });
