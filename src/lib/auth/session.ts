import { lucia } from "@/lib/auth/auth";
import { cookies } from "next/headers";
import { cache } from "react";

export const getUser = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return null;

  const { user, session } = await lucia.validateSession(sessionId);

  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  }

  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  }

  return user;
});
