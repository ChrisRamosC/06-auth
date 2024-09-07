import { firebase } from "@/firebase/config";
import { defineAction } from "astro:actions";
import { z } from "astro:content";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  type AuthError,
} from "firebase/auth";

export const registerUser = defineAction({
  accept: "form",
  input: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async ({ name, email, password, remember_me }, { cookies }) => {
    // cookies
    if (remember_me) {
      cookies.set("email", email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
        path: "/",
      });
    } else {
      cookies.delete("email", {
        path: "/",
      });
    }

    //  creación de usuario
    try {
      const user = await createUserWithEmailAndPassword(
        firebase.auth,
        email,
        password,
      );

      if (!firebase.auth.currentUser) {
        throw new Error("No se pudo crear el usuario");
      }

      // Actualizar el nombre (displayName)
      updateProfile(firebase.auth.currentUser, {
        displayName: name,
      });

      // Verificar el correo electrónico
      await sendEmailVerification(firebase.auth.currentUser, {
        // url: 'http://localhost:4321/protected?emailVerified=true'
        url: `${import.meta.env.WEBSITE_URL}/protected?emailVerified=true`,
      });

      return;
    } catch (error) {
      const firebaseError = error as AuthError;

      if (firebaseError.code === "auth/email-already-in-use") {
        throw new Error("El correo electrónico ya está en uso");
      }

      throw new Error("Auxilio! algo salió mal");
    }
  },
});
