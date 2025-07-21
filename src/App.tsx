import React, { useEffect } from 'react';
import PatientsList from './features/patients/PatientsList';
import PrescriptionForm from './features/prescriptions/PrescriptionForm';
import PrescriptionHistory from './features/prescriptions/PrescriptionHistory';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store/store';
import { fetchPatients } from './features/patients/patientsSlice';
import { fetchAllPrescriptions } from './features/prescriptions/prescriptionsSlice';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedPatient = useSelector((state: RootState) => state.patients.selectedPatient);
  const patientStatus = useSelector((state: RootState) => (state.patients.status));
  const prescriptionsStatus = useSelector((state: RootState) => (state.prescriptions.status))

  useEffect(() => {
    if(patientStatus === 'idle') {
      dispatch(fetchPatients());
    }

    if(prescriptionsStatus === 'idle') {
      dispatch(fetchAllPrescriptions());
    }
  }, [patientStatus, prescriptionsStatus, dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-8">
        <h1 className='text-4xl font-extrabold text-blue-700'>Vitura Health Patient Management System</h1>
      </header>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <PatientsList />
        </div>

        <div className="md:col-span-2 space-y-8">
          {selectedPatient ? (
            <>
              <PrescriptionForm />
              <PrescriptionHistory />
            </>
          ) : (
            <div className="p-6 bg-blue-50 text-blue-800 border-l-4 border-blue-400 rounded-lg shadow-md">
              <p className="font-semibold text-xl mb-2">Welcome !</p>
              <p>Select a patient from the list on the left to view their details and manage prescriptions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;