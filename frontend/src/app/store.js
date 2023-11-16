import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import uploadReducer from '../features/uploadSlice';
import isFormFilledReducer from '../features/isFormFilled';

const rootReducer = combineReducers({ user: userReducer, uploadData: uploadReducer, formFilled: isFormFilledReducer });

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);