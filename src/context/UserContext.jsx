import {createContext, useEffect, useState} from "react";

const UserContext = createContext(null);

const VITE_BACK_URL = import.meta.env.VITE_BACK_URL || "http://localhost:3000/api";

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser();
    } ,[]);

    const getUser = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }
            const response = await fetch(`${VITE_BACK_URL}/user/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to get user");
            }
            const data = await response.json();
            console.log("User fetched:", data);
            setUser(data);
        } catch (error) {
            console.error("Get user error:", error);
        }
    }

    const register = async (user) => {
        try {
            const response = await fetch(`${VITE_BACK_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error("Failed to sign up");
            }

            const data = await response.json();
            console.log("Sign up successful:", data);
            return response.status;
        } catch (error) {
            console.error("Sign up error:", error);
        }
    }

    const login = async (user) => {

        try {
            const response = await fetch(`${VITE_BACK_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error("Failed to login");
            }

            const data = await response.json();
            console.log("Login successful:", data);
            setUser(data.user);
            localStorage.setItem('token', data.user.token)
            return response.status;
        } catch (error) {
            console.error("Login error:", error);
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    }

    return (
        <UserContext.Provider value={{login, logout, register, user}}>
        {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider};