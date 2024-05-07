import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext"
import { useEffect } from "react";

const init = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return {
        logged: !!user,
        user: user
    }
}

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const userPre = init();

    //PERMITE ALMACENAR EN LOCAL STORAGE
    const login = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/home');
    }



    // REFRESCAR EL TOKEN
    const refreshToken = async () => {
        try {
            if (!localStorage.getItem('user')) {
                return;
            }
            const user = JSON.parse(localStorage.getItem('user'));

            const response = await fetch('https://localhost:7252/api/auth/refresh-token', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('No se pudo renovar el token')
            }
            const result = await response.json();
            localStorage.setItem('user', JSON.stringify(result.data));
            

        } catch (error) {
            console.error(error);
            localStorage.clear();
            navigate('/');
        }
    }

    // LIMPIA LOCALE STORAGE PARA CERRAR LA SESION
    const logout = () => {
        localStorage.removeItem('user');
    }

    return (
        <AuthContext.Provider value={{ ...userPre, login, refreshToken, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
