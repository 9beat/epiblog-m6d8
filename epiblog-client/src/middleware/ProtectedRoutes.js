import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import jwt from 'jwt-decode'
import Login from '../pages/Login'

const useAuth = () => {
    return JSON.parse(localStorage.getItem('loggedIn'))
}

const useSession = () => {
    const session = useAuth()
    const decodedSession = session ? jwt(session.token) : null
    const navigate = useNavigate()

    useEffect (()=>{
        if(!session){
            navigate("/login", {replace: true})
        }
    },[navigate, session])
    return decodedSession
}

const ProtectedRoutes = () => {
    const isAuth = useAuth()
    const session = useSession()
    console.log('====================================');
    console.log(session);
    console.log('====================================');
    return isAuth ? <Outlet/> : <Login/>
}

export default ProtectedRoutes