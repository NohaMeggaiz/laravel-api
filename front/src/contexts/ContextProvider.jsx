import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
});

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const setToken = (token) => {
        console.log("setToken called with:", token); // Debugging
        _setToken(token);
    
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
            console.log("Token saved in localStorage:", localStorage.getItem("ACCESS_TOKEN")); // Verify storage
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
            console.log("Token removed from localStorage");
        }
    };
    
    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)