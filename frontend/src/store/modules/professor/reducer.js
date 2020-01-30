import produce from 'immer';

const INITIAL_STATE = {
  professor: null,
};

export default function professor(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.professor = action.payload.professor;
        break;
      }

      case '@user/UPDATE_PROFESSOR_SUCCESS': {
        draft.professor = action.payload.professor;
        break;
      }

      default:
    }
  });
}
