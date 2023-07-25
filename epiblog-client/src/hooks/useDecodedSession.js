import { useEffect } from "react";
import jwt from 'jwt-decode'
import { useLocation, useNavigate } from "react-router-dom";
import Login from "../pages/Login";

const useDecodedSession = () => {
    const session = JSON.parse(localStorage.getItem("loggedIn"))
    const decodedSession = session ? jwt(session.token) : null
    const location = useLocation()
    const navigate = useNavigate()

    useEffect (()=>{
        if(!session){
            navigate(<Login/>)
        }
        if(session && location.pathname !== "/login"){
            navigate("/homepage")
        }
    },[navigate, session, location.pathname])
    return decodedSession
}

export default useDecodedSession