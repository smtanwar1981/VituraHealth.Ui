import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import api from '../../api/axioInstance';
import type { Patient } from '../../types/patient';

interface PatientsState {
    patients: Patient[],
    selectedPatient: Patient | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: PatientsState = {
    patients: [],
    selectedPatient: null,
    status: 'idle',
    error: null
}

export const fetchPatients = createAsyncThunk<Patient[], void, { rejectValue: string }>(
    'patients/fetchPatients',
    async (_: any, { rejectWithValue }: any) => {
        try {
            const response = await api.get<Patient[]>('/api/patients')
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const patientsSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
        selectPatient: (state: { selectedPatient: any; }, action: PayloadAction<Patient | null>) => {
            state.selectedPatient = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPatients.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPatients.fulfilled, (state, action: PayloadAction<Patient[]>) => {
                state.status = 'succeeded';
                state.patients = action.payload;
            })
            .addCase(fetchPatients.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to fetch patients';
            });
    }
});

export const { selectPatient } = patientsSlice.actions;

export default patientsSlice.reducer;