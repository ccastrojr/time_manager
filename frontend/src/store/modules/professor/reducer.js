import produce from 'immer';

const INITIAL_STATE = {
  professor: null,
};

export default function professor(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_SUCCESS':
      return produce(state, draft => {
        draft.professor = action.payload.professor;
      });

    default:
      return state;
  }
}
