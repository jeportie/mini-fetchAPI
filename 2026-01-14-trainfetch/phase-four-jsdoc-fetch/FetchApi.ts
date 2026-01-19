// ************************************************************************** //
//                                                                            //
//                                                                            //
//   FetchApi.ts                                                              //
//                                                                            //
//   By: jeportie <jeromep.dev@gmail.com>                                     //
//                                                                            //
//   Created: 2026/01/14 13:25:21 by jeportie                                 //
//   Updated: 2026/01/15 20:20:39 by jeportie                                 //
//                                                                            //
// ************************************************************************** //

import { FilterRoutes, ApiBody, HttpMethods, ApiReturn, EndpointKey } from "./types";

export default class FetchApi<S> {
  #baseUrl: string;

  constructor(baseUrl: string) {
    this.#baseUrl = baseUrl;
  }

  /**
     * Perform a GET request.
     *
     * Available routes:
     *
     * @endpoint `/metrics`
     *   Expose Prometheus metrics
     *   @description Returns application performance and system metrics in Prometheus text format.         This endpoint is intended for scraping by Prometheus or compatible monitoring tools.         The response contains metrics about Fastify routes, event loop lag, memory usage,         and any custom counters registered via the Prometheus client.
     *
     * @endpoint `/api/auth/activate/{token}`
     *   Activate a user account using an activation token
     *   @description Activates a newly registered user account using the activation link         sent by email. The endpoint verifies the activation token for validity,         ensures it has not been used, and marks both the token and user as activated.         Expired or invalid tokens will result in appropriate error responses.
     *
     * @endpoint `/api/auth/{provider}/start`
     *   Start OAuth flow
     *   @description Redirects to the OAuth provider’s authorization URL with proper state and next cookie set.
     *
     * @endpoint `/api/auth/{provider}/callback`
     *   OAuth callback
     *   @description Handles the OAuth2 provider redirect, exchanges code for profile, and issues tokens.
     *
     * @endpoint `/api/auth/sessions`
     *   Get user sessions
     *   @description Returns all active and historical refresh token sessions for the authenticated user, including device info, IP address, timestamps, and current session indicator.
     *
     * @endpoint `/api/system/health`
     *   Health check
     *   @description Returns the current health status of the API and database.
     *
     * @endpoint `/api/user/users`
     *   List all users (admin only)
     *   @description Retrieves the full list of registered users. Access restricted to `admin` role.
     *
     * @endpoint `/api/user/me`
     *   Get authenticated user
     *   @description Returns the authenticated user’s profile. Requires a valid Bearer access token.
     */
    get<E extends FilterRoutes<S, "GET">>(endoint: E) {
    return this.#request(endoint, "GET");
  }

  /**
     * Perform a POST request.
     *
     * Available routes:
     *
     * @endpoint `/api/auth/enable`
     *   Enable 2FA (init setup)
     *   @description Generates a TOTP secret + QR code for the user to scan with Google Authenticator.
     *
     * @endpoint `/api/auth/verify-totp`
     *   Verify TOTP code
     *   @description Verify a 6-digit time-based code from the user’s authenticator app.
     *
     * @endpoint `/api/auth/login-totp`
     *   Login with TOTP code
     *   @description Login with a 6-digit time-based code from the user’s authenticator app and issue a session.
     *
     * @endpoint `/api/auth/verify-backup`
     *   Verify backup code
     *   @description Verify a one-time backup code (issued when enabling 2FA). Each code can only be used once.
     *
     * @endpoint `/api/auth/disable`
     *   Disable 2FA
     *   @description Clears the stored secret and disables 2FA for the user.
     *
     * @endpoint `/api/auth/backup`
     *   Generate backup codes for 2FA
     *   @description Generates 10 single-use backup codes, stores them hashed, and returns plaintext codes once.
     *
     * @endpoint `/api/auth/check-2fa`
     *   Check if 2FA is enabled for a user
     *   @description This endpoint verifies whether a given username or email has two-factor authentication (2FA) enabled.         It is typically used before login to determine if a second verification step is required.
     *
     * @endpoint `/api/auth/login`
     *   Login (issue access & refresh, or request 2FA)
     *   @description Authenticate with username/email + password. If 2FA is enabled,         the server responds with `f2a_required` instead of issuing tokens.         If the account has not been activated, the server responds with         'activation_required' instead of issuing tokens.
     *
     * @endpoint `/api/auth/register`
     *   Register new account
     *   @description Create a new user account with username, email, and password.
     *
     * @endpoint `/api/auth/refresh`
     *   Refresh access token (rotate refresh)
     *   @description Uses the HttpOnly refresh cookie to validate and rotate the refresh token, then returns a new access token.
     *
     * @endpoint `/api/auth/logout`
     *   Logout (revoke refresh)
     *   @description Deletes the stored refresh token tied to the cookie and clears the cookie.
     *
     * @endpoint `/api/auth/forgot-pwd`
     *   Request a password reset email
     *   @description Initiates the password reset process for an account associated with the given email.         This endpoint verifies the provided reCAPTCHA token, creates a reset token,         stores it in the database, and sends a password reset email to the user.         The email will contain a reset link valid for 1 hour.
     *
     * @endpoint `/api/auth/reset-pwd`
     *   Reset a user's password using a reset token
     *   @description Completes the password reset process. The client must provide the reset token         received by email and the new password. The token is verified for validity, usage,         and expiration before the password is updated. The token is marked as used after success.
     *
     * @endpoint `/api/auth/resend-link`
     *   Resend the activation link to the user email adresse.
     *   @description Emit a new token if no token has beed found of if the old one has expired.
     *
     * @endpoint `/api/auth/sessions/revoke`
     *   Revoke user session
     *   @description Revokes a specific user refresh token session, effectively logging out that session. If the current session is revoked, related authentication cookies are cleared.
     *
     * @endpoint `/api/user/modify-pwd`
     *   Modify the password of the currently authenticated user
     *   @description Allows an authenticated user to change their password.         For local accounts, the user must provide their current password.         For OAuth-linked accounts, the `oauth` flag can be used to skip verification.
     */
    post<E extends FilterRoutes<S, "POST">>(endoint: E, body: ApiBody<S, E, "POST">) {
    return this.#request(endoint, "POST", body);
  }

  /**
     * Perform a PUT request.
     *
     * Available routes:
     *
     * N/A
     */
    put<E extends FilterRoutes<S, "PUT">>(endoint: E, body: ApiBody<S, E, "PUT">) {
    return this.#request(endoint, "PUT", body);
  }

  /**
     * Perform a DELETE request.
     *
     * Available routes:
     *
     * N/A
     */
    delete<E extends FilterRoutes<S, "DELETE">>(endoint: E) {
    return this.#request(endoint, "DELETE");
  }

  async #request<E extends EndpointKey<S>, M extends HttpMethods>(
    endpoint: E,
    method: M,
    body?: ApiBody<S, E, M>
  )
    : Promise<ApiReturn<S, E, M>> {
    const url = this.#baseUrl + endpoint;

    const options: RequestInit = {
      method,
      headers: {
        "Accept": "application/json",
      }
    }

    if (body !== undefined) {
      options.headers = {
        ...options.headers,
        "Content-Type": "application/json",
      }
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`[API Error]: ${response.status} from: %{endpoint}`);
    }

    return response.json() as Promise<ApiReturn<S, E, M>>;
  }
}
