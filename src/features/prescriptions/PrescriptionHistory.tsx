import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

const PrescriptionHistory: React.FC = () => {
    const { selectedPatient } = useSelector((state: RootState) => state.patients);
    const { prescriptions, status, error } = useSelector((state: RootState) => state.prescriptions);

    if(!selectedPatient) {
        return (
            <div className='p-4 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg'>
                Select a patient to view their prescription history.
            </div>
        );
    }

    if(status === 'loading') {
        return <LoadingSpinner />;
    }

    if(status == 'failed') {
        return <ErrorMessage message={error} />;
    }

    const patientPrescriptions = prescriptions.filter(p => p.patientId == selectedPatient.id);

    return (
        <div className='p-4 bg-white shadow rounded-lg'>
            <h2 className='text-2xl font-bold mb-4 text-gray-800'>Prescription History for {selectedPatient.fullName}</h2>
            {
                patientPrescriptions.length === 0 ? (
                    <p className='text-gray-600'>No prescriptions found for this patient.</p>
                ) : (
                    <ul className='divide-y divide-gray-200'>
                        {patientPrescriptions.map((p) => (
                            <li key={p.id} className='p-3'>
                                <div className='text-lg font-medium text-gray-900'>{p.drugName}</div>
                                <div className='text-sm text-gray-600'>Dosage: {p.dosage}</div>
                                <div className='text-sm text-gray-500'>Prescribed On: {new Date(p.datePrescribed).toLocaleDateString()}</div>
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
    );
};

export default PrescriptionHistory;