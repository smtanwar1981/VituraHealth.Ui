import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import api from '../../api/axioInstance';
import type { Prescription, CreatePrescriptionRequest } from '../../types/prescription';

interface PrescriptionState {
    prescriptions: Prescription[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    addStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: PrescriptionState = {
    prescriptions: [],
    status: 'idle',
    addStatus: 'idle',
    error: null,
}

export const fetchAllPrescriptions = createAsyncThunk<
    Prescription[],
    void,
    { rejectValue: string }
>(
    'prescriptions/fetchPrescriptions',
    async (_: any, { rejectWithValue }: any) => {
        try {
            const response = await api.get<Prescription[]>('/api/prescriptions')
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const addPrescription = createAsyncThunk<
    Prescription,
    CreatePrescriptionRequest,
    { rejectValue: string }
>(
    'prescriptions/addPrescription',
    async (prescriptionData, { rejectWithValue }: any) => {
        try {
            prescriptionData.datePrescribed = new Date().toISOString().split('T')[0];
            const response = await api.post<Prescription>('/api/prescriptions', prescriptionData);
            return response.data;
        } catch (error: any) {
            const errorMessages = Array.isArray(error.response?.data)
                ? error.response.data.join(', ')
                : error.response?.data || error.message;
            return rejectWithValue(errorMessages);
        }
    }
);

const prescriptionsSlice = createSlice({
    name: 'prescriptions',
    initialState,
    reducers: {
        resetAddStatus: (state) => {
            state.addStatus = 'idle',
                state.error = null;
        },
        prescriptionAddedOptimistically: (state, action: PayloadAction<Prescription>) => {
            if (!state.prescriptions.some(p => p.id === action.payload.id)) {
                state.prescriptions.push(action.payload);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPrescriptions.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchAllPrescriptions.fulfilled, (state, action: PayloadAction<Prescription[]>) => {
                state.status = 'succeeded';
                state.prescriptions = action.payload;
            })
            .addCase(fetchAllPrescriptions.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to fetch prescriptions';
            })
            .addCase(addPrescription.pending, (state) => {
                state.addStatus = 'loading';
                state.error = null;
            })
            .addCase(addPrescription.fulfilled, (state) => {
                state.addStatus = 'succeeded';
            })
            .addCase(addPrescription.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.addStatus = 'failed';
                state.error = action.payload || 'Failed to add prescription';
            })
    }
});

export const { resetAddStatus, prescriptionAddedOptimistically } = prescriptionsSlice.actions;

export default prescriptionsSlice.reducer;