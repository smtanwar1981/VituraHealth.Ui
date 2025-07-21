import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/store';
import { addPrescription, fetchAllPrescriptions, resetAddStatus } from './prescriptionsSlice';
import ErrorMessage from '../../components/ErrorMessage';
import LoadingSpinner from '../../components/LoadingSpinner';

const PrescriptionForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { selectedPatient } = useSelector((state: RootState) => state.patients);
    const { addStatus, error } = useSelector((state: RootState) => state.prescriptions);

    const [drugName, setDrugName] = useState('');
    const [dosage, setDosage] = useState('');
    const [validationErrors, setValidationErrors] = useState<{ drugName?: string; dosage?: string }>({});

    useEffect(() => {
        if (addStatus === 'succeeded' || !selectedPatient) {
            setDrugName('');
            setDosage('');
            setValidationErrors({});
            dispatch(resetAddStatus());
        }
    }, [selectedPatient, addStatus, dispatch])

    const validateForm = () => {
        const errors: { drugName?: string; dosage?: string } = {};
        if (!drugName.trim()) {
            errors.drugName = 'Drug Name is required';
        }
        if (!dosage.trim()) {
            errors.dosage = 'Dosage is required';
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedPatient) {
            alert('Please select a patient first.');
            return;
        }
        if (!validateForm()) {
            return;
        }

        const request = {
            patientId: selectedPatient.id,
            drugName,
            dosage
        };

        const resultAction = await dispatch(addPrescription(request));
        if(addPrescription.fulfilled.match(resultAction)) {
            dispatch(fetchAllPrescriptions());
            dispatch(resetAddStatus());
        }
    };

    if (!selectedPatient) {
        return (
            <div className='p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg'>
                Please select a patient to add a prescription.
            </div>
        );
    }

    return (
        <div className='p-4 bg-white shadow rounded-lg'>
            <h2 className='text-2xl font-bold mb-4 text-gray-800'>Add Prescription for {selectedPatient.fullName}</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label htmlFor='drugName' className='block text-sm font-medium text-gray-700'>
                        Drug Name:
                    </label>
                    <input
                        type='text'
                        id='drugName'
                        value={drugName}
                        onChange={(e) => setDrugName(e.target.value)}
                        className={`mt-1 block w-full rounded-md border ${validationErrors.drugName ? 'border-red-500' : 'border-gray-300'
                            } shadow-sm focus: border=blue-500 focus:ring-blue-500 sm: text-sm p-2`}
                        disabled={addStatus === 'loading'}
                    />
                    {validationErrors.drugName && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.drugName}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="dosage" className="block text-sm font-medium text-gray-700">
                        Dosage:
                    </label>
                    <input
                        type="text"
                        id="dosage"
                        value={dosage}
                        onChange={(e) => setDosage(e.target.value)}
                        className={`mt-1 block w-full rounded-md border ${validationErrors.dosage ? 'border-red-500' : 'border-gray-300'
                            } shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2`}
                        disabled={addStatus === 'loading'}
                    />
                    {validationErrors.dosage && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.dosage}</p>
                    )}
                </div>
                {addStatus === 'loading' && <LoadingSpinner />}
                {addStatus === 'failed' && <ErrorMessage message={error} />}
                {addStatus === 'succeeded' && (
                    <p className='text-green-600 font-semibold'>Prescription added successfully.</p>
                )}
                <button
                    type='submit'
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    disabled={addStatus === 'loading' || !selectedPatient}
                >
                    Add Prescription
                </button>
            </form >
        </div >
    );
};

export default PrescriptionForm;