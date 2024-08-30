"use server";

import { authProcedure } from "@/procedures/auth";
import { loginSchema } from "@/schemas/auth";
import { lucia } from "@/lib/auth/auth";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";

export const loginAction = authProcedure
  .createServerAction()
  .input(loginSchema)
  .handler(async ({ input }) => {
    const { email, password } = input;

    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
      .then((rows) => rows[0]);

    if (!user) {
      return { error: "INVALID_CREDENTIALS" };
    }

    const argon2id = new Argon2id();
    const validPassword = await argon2id.verify(user.hashedPassword, password);

    if (!validPassword) {
      return { error: "INVALID_CREDENTIALS" };
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    };
  });
