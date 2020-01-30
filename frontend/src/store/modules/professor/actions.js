export function updateProfessorRequest(data) {
  return {
    type: '@user/UPDATE_PROFESSOR_REQUEST',
    payload: { data },
  };
}

export function updateProfessorSuccess(professor) {
  return {
    type: '@user/UPDATE_PROFESSOR_SUCCESS',
    payload: { professor },
  };
}

export function updateProfessorFailure() {
  return {
    type: '@user/UPDATE_PROFESSOR_FAILURE',
  };
}
