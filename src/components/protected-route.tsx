import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
  const {user} = useSelector((state:RootState)=>state.auth); 
  if(!user){
    return <Navigate to="/login" />;;
  }
  return (
    <Outlet/>
  )
}

export default ProtectedRoute