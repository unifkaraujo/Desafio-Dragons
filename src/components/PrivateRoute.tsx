import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const Autententicado = localStorage.getItem('Autenticado') === 'true';
  return Autententicado ? <Outlet /> : <Navigate to="/login" />;
};