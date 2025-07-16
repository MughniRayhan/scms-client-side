import React from 'react'
import useUserRole from '../../../Hooks/useUserRole';
import Loader from '../../../Components/Loader/Loader';
import Forbidden from '../../Forbidden/Forbidden';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import MemberDashboard from './MemberDashboard';
function DashboardHome() {
  const {role,roleLoading} = useUserRole();

  if(roleLoading){
    return <Loader/>
  }

  if(role === "user"){
    return <UserDashboard/>
  }

  else if(role === "member"){
    return <MemberDashboard/>
  }

  else if(role === "admin"){
    return <AdminDashboard/>
  }

  else{
    return <Forbidden></Forbidden>
  }
 
}

export default DashboardHome