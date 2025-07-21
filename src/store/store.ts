import { configureStore } from '@reduxjs/toolkit';
import patientsReducer from '../features/patients/patientsSlice';
import prescriptionReducer from '../features/prescriptions/prescriptionsSlice';

export const store = configureStore({
    reducer: {
        patients: patientsReducer,
        prescriptions: prescriptionReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;