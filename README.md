# Vitura Health Frontent

This repository contains a React application that provides Vitura Health Backend API interaction, and a responsive user interface.

## Features

* **Patient Listing:** Displays a list of all available patients fetched from the backend.
* **Patient Selection:** Allows users to select a patient from the list.
* **Prescription History:** Shows the complete prescription history for the selected patient (fetched and filtered client-side for efficiency in this demo).
* **Add Prescription:** Provides a form to add new prescriptions for the currently selected patient.
* **Client-side Data Management:** Utilizes Redux Toolkit for state management, including fetching all prescriptions on initial load and client-side filtering.
* **Form Validation:** Basic client-side validation for adding prescriptions.

## Technologies Used

### Frontend (React)
* **Framework:** React (Vite)
* **Language:** TypeScript
* **State Management:** Redux Toolkit
* **Styling:** Tailwind CSS (intended, see "Known Issues")
* **HTTP Client:** Axios
* **Testing:** Vitest, React Testing Library

## How to Run the Application (Directions for Interviewer)

Please follow these steps to get the React frontend up and running.

### 1. Prerequisites

Before you start, ensure you have the following installed:
* **Node.js (LTS version recommended)**: [Download Node.js](https://nodejs.org/en/download)
* **npm** (comes with Node.js) or **Yarn**

### 2. Frontend Setup (React App)

1.  **Navigate to the Frontend Directory:**
    Open a **new** terminal or command prompt window and go into the frontend folder.
    ```bash
    cd frontend-patient-app # Or whatever your frontend folder is named (e.g., CodeChallenge/VituraHealthUi/vitura-health-ui)
    ```
2.  **Install Dependencies:**
    ```bash
    npm install # or yarn install
    ```
3.  **Run the Frontend Development Server:**
    ```bash
    npm run dev # or yarn dev
    ```
    The React application should open in your default browser, typically at `http://localhost:5173` (check the console output for the exact URL).

### 4. Using the Application

* Once both the backend and frontend are running, you should see the patient list.
* Click on any patient's name to view their prescription history and the form to add new prescriptions.
* Fill out the "Drug Name" and "Dosage" fields and click "Add Prescription" to save a new entry.

## Known Issues / Limitations

* **Tailwind CSS Not Applying Fully:** While Tailwind CSS is correctly configured and partially working (e.g., `min-h-screen`), some utility classes like `bg-gray-100` and `p-8` are not applying as expected in the UI. The generated CSS file in the browser's developer tools correctly contains these rules, but they are not rendered. All configuration files (`tailwind.config.js`, `postcss.config.js`, `index.css`, `main.tsx`, `vite.config.ts`) have been verified and appear correct. This indicates a very subtle or environmental issue.

## Future Improvements

* Implement proper backend pagination and filtering for prescriptions.
* Add more robust client-side form validation.
* Implement authentication and authorization.
* Enhance UI/UX with more interactive elements and responsiveness.
* Add delete/edit functionality for prescriptions.
* Resolve the Tailwind CSS rendering inconsistency for a fully styled UI.

---