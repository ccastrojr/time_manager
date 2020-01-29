export function signInRequest(registration, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { registration, password },
  };
}

export function signInSuccess(token, professor) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, professor },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}
