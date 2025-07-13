import React from 'react'
import useUserRole from '../../../Hooks/useUserRole';
import Loader from '../../../Components/Loader/Loader';
import Forbidden from '../../Forbidden/Forbidden';
function DashboardHome() {
  const {role,roleLoading} = useUserRole();

  if(roleLoading){
    return <Loader/>
  }

  if(role === "user"){
    return "Dashboard"
  }

  else if(role === "member"){
    return "Dashboard"
  }

  else if(role === "admin"){
    return "Dashboard"
  }

  else{
    return <Forbidden></Forbidden>
  }
 
}

export default DashboardHome