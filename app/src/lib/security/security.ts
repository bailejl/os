import { firebaseUsernamePassowordLogin } from "../integrations/baas/firebase/firebase-integration";

export function emailPassowordLogin(
  email: string,
  password: string,
  tenantId: string
) {
  firebaseUsernamePassowordLogin(email, password, tenantId);
}
