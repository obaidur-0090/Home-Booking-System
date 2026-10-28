export function authErrorMessage(error) {
  const messages = {
    'auth/email-already-in-use': 'An account already uses this email. Try signing in instead.',
    'auth/invalid-credential': 'That email and password combination doesn’t look right.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/weak-password': 'Choose a password with at least 6 characters.',
    'auth/popup-closed-by-user': 'The Google sign-in window was closed before finishing.',
    'auth/unauthorized-domain': 'This domain is not enabled for Firebase sign-in yet.',
  }
  return messages[error.code] || error.message || 'Something went wrong. Please try again.'
}
