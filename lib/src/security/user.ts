import { UserInfo } from './user-info';
import { UserMetadata } from './user-metadata';

export declare interface User extends UserInfo {
  /**
   * Whether the email has been verified
   */
  readonly emailVerified: boolean;
  /**
   * Additional metadata around user creation and sign-in times.
   */
  readonly metadata: UserMetadata;
  /**
   * Additional per provider such as displayName and profile information.
   */
  readonly providerData: UserInfo[];
  /**
   * Refresh token used to reauthenticate the user. Avoid using this directly and prefer
   * {@link User.getIdToken} to refresh the ID token instead.
   */
  readonly refreshToken: string;
  /**
   * The user's tenant ID.
   *
   * @remarks
   * This is a read-only property, which indicates the tenant ID
   * used to sign in the user.
   */
  readonly tenantId: string | null;
  /**
   * Returns a JSON Web Token (JWT) used to identify the user to a Firebase service.
   *
   * @remarks
   * Returns the current token if it has not expired or if it will not expire in the next five
   * minutes. Otherwise, this will refresh the token and return a new one.
   *
   * @param forceRefresh - Force refresh regardless of token expiration.
   */
  getIdToken(forceRefresh?: boolean): Promise<string>;
  /**
   * Refreshes the user, if signed in.
   */
  reload(): Promise<void>;
  /**
   * Returns a JSON-serializable representation of this object.
   *
   * @returns A JSON-serializable representation of this object.
   */
  toJSON(): object;
}
