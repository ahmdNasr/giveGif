import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { apiBaseUrl } from '../../api/api';

const AuthRequired = ({ token, children, setToken }) => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (token) {
			setLoading(false);
			//Token already exists, no need to do anything
			return;
		}
		fetch(apiBaseUrl + '/users/refreshtoken', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
      // Damit er die HTTP Only Secure Cookies abspeichert im Browser!
      credentials: 'include'
		})
			.then((response) => response.json())
			.then((data) => {
				setLoading(false);
				setToken(data.token);
			});
	}, []);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (!token) {
		return <Navigate to='/login' />;
	}

	return <>{children}</>;
};

export default AuthRequired;
