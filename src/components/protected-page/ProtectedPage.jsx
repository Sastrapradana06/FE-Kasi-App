import { useShallow } from 'zustand/react/shallow'
import useKasirStore from "../../store/store";
import Container from '../container/Container';
import Login from '../../auth/Login';


export default function ProtectedPage({children}) {
  const [authenticated] = useKasirStore(
    useShallow((state) => [state.authenticated])
  )

  const navigate = useNavigate()

  return (
    <>
      {authenticated ? (
        {children}
      ) : navigate('/login')}
    </>
  ) 
}
