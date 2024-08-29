/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export const AuthContext = createContext(null);

export const AuthProvider = ({children}) =>{
    const [auth,setAuth] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() =>{
        const StringfyBlogData = window.localStorage.getItem("BlogData");

        if(StringfyBlogData){
            const DataBlog = JSON.parse(StringfyBlogData)
            const User = DataBlog.user;
            setAuth(User)
        }else{
            setAuth(null);
        }
    },[navigate,location])

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
};

export const UseAuth = () =>{
    const auth = useContext(AuthContext)
    return auth;
}