import React from "react";
import { useState } from "react/cjs/react.development";

const AuthContext=React.createContext({
    token:'',
    isLoggedIn:false,
    login:()=>{},
    logout:()=>{}

})

export const AuthContextProvider=(props)=>{
    const [token,setToken]=useState(null)
    const loginHandeler=(token)=>{
            setToken(token)
    };
    const logoutHandeler=()=>{
        setToken(null);
    };
    const userIsLoggedIn=!!token;
    const contextValue={
        token:token,
        isLoggedIn:userIsLoggedIn,
        login:loginHandeler,
        logoutHandeler:logoutHandeler,

    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
        </AuthContext.Provider>
}
export default AuthContext;