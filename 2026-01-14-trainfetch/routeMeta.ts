// ⚠️ AUTO-GENERATED — DO NOT EDIT
export const routeMeta = {

  "/metrics": {
    /**
     * Expose Prometheus metrics
     */
    method: "GET",
  },

  "/metrics": {

    method: "POST",
  },

  "/metrics": {

    method: "PUT",
  },

  "/metrics": {

    method: "DELETE",
  },

  "/api/auth/enable": {

    method: "GET",
  },

  "/api/auth/enable": {
    /**
     * Enable 2FA (init setup)
     */
    method: "POST",
  },

  "/api/auth/enable": {

    method: "PUT",
  },

  "/api/auth/enable": {

    method: "DELETE",
  },

  "/api/auth/verify-totp": {

    method: "GET",
  },

  "/api/auth/verify-totp": {
    /**
     * Verify TOTP code
     */
    method: "POST",
  },

  "/api/auth/verify-totp": {

    method: "PUT",
  },

  "/api/auth/verify-totp": {

    method: "DELETE",
  },

  "/api/auth/login-totp": {

    method: "GET",
  },

  "/api/auth/login-totp": {
    /**
     * Login with TOTP code
     */
    method: "POST",
  },

  "/api/auth/login-totp": {

    method: "PUT",
  },

  "/api/auth/login-totp": {

    method: "DELETE",
  },

  "/api/auth/verify-backup": {

    method: "GET",
  },

  "/api/auth/verify-backup": {
    /**
     * Verify backup code
     */
    method: "POST",
  },

  "/api/auth/verify-backup": {

    method: "PUT",
  },

  "/api/auth/verify-backup": {

    method: "DELETE",
  },

  "/api/auth/disable": {

    method: "GET",
  },

  "/api/auth/disable": {
    /**
     * Disable 2FA
     */
    method: "POST",
  },

  "/api/auth/disable": {

    method: "PUT",
  },

  "/api/auth/disable": {

    method: "DELETE",
  },

  "/api/auth/backup": {

    method: "GET",
  },

  "/api/auth/backup": {
    /**
     * Generate backup codes for 2FA
     */
    method: "POST",
  },

  "/api/auth/backup": {

    method: "PUT",
  },

  "/api/auth/backup": {

    method: "DELETE",
  },

  "/api/auth/check-2fa": {

    method: "GET",
  },

  "/api/auth/check-2fa": {
    /**
     * Check if 2FA is enabled for a user
     */
    method: "POST",
  },

  "/api/auth/check-2fa": {

    method: "PUT",
  },

  "/api/auth/check-2fa": {

    method: "DELETE",
  },

  "/api/auth/login": {

    method: "GET",
  },

  "/api/auth/login": {
    /**
     * Login (issue access & refresh, or request 2FA)
     */
    method: "POST",
  },

  "/api/auth/login": {

    method: "PUT",
  },

  "/api/auth/login": {

    method: "DELETE",
  },

  "/api/auth/register": {

    method: "GET",
  },

  "/api/auth/register": {
    /**
     * Register new account
     */
    method: "POST",
  },

  "/api/auth/register": {

    method: "PUT",
  },

  "/api/auth/register": {

    method: "DELETE",
  },

  "/api/auth/refresh": {

    method: "GET",
  },

  "/api/auth/refresh": {
    /**
     * Refresh access token (rotate refresh)
     */
    method: "POST",
  },

  "/api/auth/refresh": {

    method: "PUT",
  },

  "/api/auth/refresh": {

    method: "DELETE",
  },

  "/api/auth/logout": {

    method: "GET",
  },

  "/api/auth/logout": {
    /**
     * Logout (revoke refresh)
     */
    method: "POST",
  },

  "/api/auth/logout": {

    method: "PUT",
  },

  "/api/auth/logout": {

    method: "DELETE",
  },

  "/api/auth/forgot-pwd": {

    method: "GET",
  },

  "/api/auth/forgot-pwd": {
    /**
     * Request a password reset email
     */
    method: "POST",
  },

  "/api/auth/forgot-pwd": {

    method: "PUT",
  },

  "/api/auth/forgot-pwd": {

    method: "DELETE",
  },

  "/api/auth/reset-pwd": {

    method: "GET",
  },

  "/api/auth/reset-pwd": {
    /**
     * Reset a user's password using a reset token
     */
    method: "POST",
  },

  "/api/auth/reset-pwd": {

    method: "PUT",
  },

  "/api/auth/reset-pwd": {

    method: "DELETE",
  },

  "/api/auth/resend-link": {

    method: "GET",
  },

  "/api/auth/resend-link": {
    /**
     * Resend the activation link to the user email adresse.
     */
    method: "POST",
  },

  "/api/auth/resend-link": {

    method: "PUT",
  },

  "/api/auth/resend-link": {

    method: "DELETE",
  },

  "/api/auth/activate/{token}": {
    /**
     * Activate a user account using an activation token
     */
    method: "GET",
  },

  "/api/auth/activate/{token}": {

    method: "POST",
  },

  "/api/auth/activate/{token}": {

    method: "PUT",
  },

  "/api/auth/activate/{token}": {

    method: "DELETE",
  },

  "/api/auth/{provider}/start": {
    /**
     * Start OAuth flow
     */
    method: "GET",
  },

  "/api/auth/{provider}/start": {

    method: "POST",
  },

  "/api/auth/{provider}/start": {

    method: "PUT",
  },

  "/api/auth/{provider}/start": {

    method: "DELETE",
  },

  "/api/auth/{provider}/callback": {
    /**
     * OAuth callback
     */
    method: "GET",
  },

  "/api/auth/{provider}/callback": {

    method: "POST",
  },

  "/api/auth/{provider}/callback": {

    method: "PUT",
  },

  "/api/auth/{provider}/callback": {

    method: "DELETE",
  },

  "/api/auth/sessions": {
    /**
     * Get user sessions
     */
    method: "GET",
  },

  "/api/auth/sessions": {

    method: "POST",
  },

  "/api/auth/sessions": {

    method: "PUT",
  },

  "/api/auth/sessions": {

    method: "DELETE",
  },

  "/api/auth/sessions/revoke": {

    method: "GET",
  },

  "/api/auth/sessions/revoke": {
    /**
     * Revoke user session
     */
    method: "POST",
  },

  "/api/auth/sessions/revoke": {

    method: "PUT",
  },

  "/api/auth/sessions/revoke": {

    method: "DELETE",
  },

  "/api/system/health": {
    /**
     * Health check
     */
    method: "GET",
  },

  "/api/system/health": {

    method: "POST",
  },

  "/api/system/health": {

    method: "PUT",
  },

  "/api/system/health": {

    method: "DELETE",
  },

  "/api/user/users": {
    /**
     * List all users (admin only)
     */
    method: "GET",
  },

  "/api/user/users": {

    method: "POST",
  },

  "/api/user/users": {

    method: "PUT",
  },

  "/api/user/users": {

    method: "DELETE",
  },

  "/api/user/me": {
    /**
     * Get authenticated user
     */
    method: "GET",
  },

  "/api/user/me": {

    method: "POST",
  },

  "/api/user/me": {

    method: "PUT",
  },

  "/api/user/me": {

    method: "DELETE",
  },

  "/api/user/modify-pwd": {

    method: "GET",
  },

  "/api/user/modify-pwd": {
    /**
     * Modify the password of the currently authenticated user
     */
    method: "POST",
  },

  "/api/user/modify-pwd": {

    method: "PUT",
  },

  "/api/user/modify-pwd": {

    method: "DELETE",
  },
} as const;
