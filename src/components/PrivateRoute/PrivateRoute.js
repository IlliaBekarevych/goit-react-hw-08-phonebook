import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthSelector } from 'redux/auth';
import Container from '../Container/Container';

export default function PrivateRoute({ children }) {
   const isLoggedIn = useSelector(AuthSelector.getIsLoggedIn);
   return (
      <div>
         {isLoggedIn ? (
            <Container>{children}</Container>
         ) : (
            <Navigate replace to="login" />
         )}
      </div>
   );
}
