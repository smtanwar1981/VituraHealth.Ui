import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/store';
import { fetchPatients, selectPatient } from './patientsSlice';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import type { Patient } from '../../types/patient';

const PatientsList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { patients, selectedPatient, status, error } = useSelector((state: RootState) => state.patients);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPatients());
        }
    }, [status, dispatch]);

    const handlePatientSelect = (patient: Patient) => {
        dispatch(selectPatient(patient));
    }

    if (status === 'loading') {
        return <LoadingSpinner />;
    }

    if (status === 'failed') {
        return <ErrorMessage message={error} />;
    }

    return (
        <div className='p-4 bg-white shadow rounded-lg'>
            <h2 className='text-2xl font-bold mb-4 text-gray-800'>Patients</h2>
            {patients.length === 0 ? (
                <p className='text-gray-600'>No patients found.</p>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {
                        patients.map((patient) => (
                            <li
                                key={patient.id}
                                className={`p-3 cursor-pointer hover:bg-blue-50 ${
                                    selectedPatient?.id === patient.id ? 'bg-blue-100 font-semibold' : ''
                                }`}
                                onClick={() => handlePatientSelect(patient)}
                            >
                                <div className='text-lg text-gray-900'>{patient.fullName}</div>
                                <div className='text-sm text-gray-500'>DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}</div>
                            </li>
                        ))
                    }
                </ul>
            )}
        </div>
    );
};

export default PatientsList;

