export const domainUrl = "http://localhost:3000";

export default {
  auth: {
    confirm: `${domainUrl}/auth/confirm?code=`,
    resetPassword: `${domainUrl}/auth/reset-password?code=`,
  },
};