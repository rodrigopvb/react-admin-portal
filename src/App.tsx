import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import UserManagement from '@/features/users/UserManagement';

function App() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<UserManagement />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
