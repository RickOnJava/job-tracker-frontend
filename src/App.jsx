import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/auth_pages/Login';
import Register from './components/auth_pages/Register';
import AddJobForm from './components/AddJobForm';
import EditJobForm from './components/EditJobForm';
import Dashboard from './components/dashboard/Dashboard';

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((store) => store.auth);
  return token ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { token } = useSelector((store) => store.auth);
  return token ? <Navigate to="/dashboard" /> : children;
};

const App = () => (
  <Router>
    <Routes>

      <Route path="/" element={<Navigate to="/dashboard" />} />

      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

    </Routes>
  </Router>
);

export default App;
