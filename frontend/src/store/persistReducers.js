import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'timemanager',
      storage,
      whitelist: ['auth', 'professor'],
    },
    reducers
  );

  return persistedReducer;
};
