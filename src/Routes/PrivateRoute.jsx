import React, { use } from 'react'
import UseAuth from '../Hooks/UseAuth';
import Loader from '../Components/Loader/Loader';
import { Navigate, useLocation } from 'react-router';

function PrivateRoute({children}) {
    const {user,loading} = UseAuth();
    const location = useLocation()
    if(loading){
        return <Loader></Loader>
    }
if(user && user?.email){
    return children;
}
return <Navigate state={location.pathname}  to='/login'></Navigate>
}


export default PrivateRoute