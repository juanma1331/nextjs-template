"use server";

import { authProcedure } from "@/procedures/auth";
import { registerSchema } from "@/schemas/auth";
import { lucia } from "@/lib/auth/auth";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
import { cookies } from "next/headers";

import { eq, or } from "drizzle-orm";

export const registerAction = authProcedure
  .createServerAction()
  .input(registerSchema)
  .handler(async ({ input }) => {
    const { username, email, password } = input;

    const existingUser = await db
      .select()
      .from(users)
      .where(or(eq(users.username, username), eq(users.email, email)))
      .limit(1)
      .then((rows) => rows[0]);

    if (existingUser) {
      if (existingUser.username === username) {
        return { error: "USERNAME_TAKEN" };
      }
      if (existingUser.email === email) {
        return { error: "EMAIL_TAKEN" };
      }
    }

    const hashedPassword = await new Argon2id().hash(password);
    const userId = generateId(15);

    try {
      await db.insert(users).values({
        id: userId,
        username,
        email,
        hashedPassword,
      });

      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      return {
        success: true,
        user: {
          id: userId,
          username,
          email,
        },
      };
    } catch (error) {
      console.error("Error during registration:", error);
      return { error: "UNKNOWN_ERROR" };
    }
  });
