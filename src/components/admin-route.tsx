import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

const AdminRoute = () => {
  const {user} = useSelector((state:RootState)=>state.auth);
  if(!user || user.accountType !== "ADMIN"){
    return <Navigate to="/login" />;;
  }
  return (
    <Outlet/>
  )
}

export default AdminRoute