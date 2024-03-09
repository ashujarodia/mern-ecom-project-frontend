import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
	children?: ReactElement;
	isAuthenticated: boolean;
	isAdmin?: boolean;
	adminOnly?: boolean;
	redirect?: string;
}

const ProtectedRoute = ({ isAuthenticated, children, isAdmin, redirect = '/', adminOnly }: Props) => {
	if (!isAuthenticated) {
		return <Navigate to={redirect} />;
	}

	if (adminOnly && !isAdmin) {
		return <Navigate to={'/'} />;
	}

	return children ? children : <Outlet />;
};

export default ProtectedRoute;
