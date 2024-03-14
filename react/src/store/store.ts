import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/AuthSlice';

// Import the necessary persist functions and storage
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const authPersistConfig = {
    key: 'auth',
    storage: storage,
};


const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);


const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
    },
});

const persistor = persistStore(store);


export { store, persistor };
