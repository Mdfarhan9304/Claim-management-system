import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/auth/LoginForm';
import { ClaimForm } from './components/claims/ClaimForm';
import { PatientDashboard } from './pages/PatientDashboard';
import { InsurerDashboard } from './pages/InsurerDashboard';
import { RegistrationForm } from './components/auth/Registrationform';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/login"
            element={
              <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <LoginForm  />
              </div>
            }
          />
         <Route
            path="/register"
            element={
              <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <RegistrationForm  />
              </div>
            }
          />
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/submit-claim" element={<ClaimForm />} />
          <Route path="/insurer/dashboard" element={<InsurerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;