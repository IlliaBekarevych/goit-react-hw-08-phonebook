import { configureStore } from '@reduxjs/toolkit';
import authReduser from './auth/auth-slice';
import contactsReduser from './contacts/contacts-slice';
import {
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
   key: 'auth',
   storage,
   whitelist: ['token'],
};

const contactsPersistConfig = {
   key: 'contacts',
   storage,
   whitelist: ['token'],
};

export const store = configureStore({
   reducer: {
      contacts: persistReducer(contactsPersistConfig, contactsReduser),
      auth: persistReducer(authPersistConfig, authReduser),
   },
   middleware: getDefaultMiddleware => [
      ...getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }),
   ],
   devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
