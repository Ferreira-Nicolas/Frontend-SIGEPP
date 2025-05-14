import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export const RequireAuth: React.FC<{ allowedRoles?: string[] }> = ({
  allowedRoles,
}) => {
  const { user } = useAuth();
  const loc = useLocation();

  if (!user) return <Navigate to="/login" state={{ from: loc }} replace />;
  if (
    allowedRoles &&
    !allowedRoles.includes(user.role.name)
  ) {
    return <Navigate to="/not-authorized" replace />;
  }
  return <Outlet />;
};
