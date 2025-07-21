import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import patientsReducer, { fetchPatients, selectPatient } from '../../src/features/patients/patientsSlice';
import PatientsList from '../../src/features/patients/PatientsList';
import { vi } from 'vitest';
