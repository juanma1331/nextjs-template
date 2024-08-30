import { createServerActionProcedure } from "zsa";

export const authProcedure = createServerActionProcedure().handler(async () => {
  // Aquí puedes agregar lógica común para todas las acciones de autenticación
  // Por ejemplo, verificar si hay una sesión activa
  return {};
});
