import { Route, Routes } from 'react-router-dom';
import HomeView from 'components/View/HomeView';
import LoginView from 'components/View/LoginView';
import RegisterView from 'components/View/RegisterView';
import { useDispatch, useSelector } from 'react-redux';
import { AuthOperations, AuthSelector } from 'redux/auth';
import { useEffect } from 'react';
import Loader from 'components/Loader/Loader';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import PablicRoute from 'components/PablicRoute/PablicRoute';
import NotFoundView from 'components/View/NotFoundView';

export default function App() {
   const dispatch = useDispatch();
   const isRefreshing = useSelector(AuthSelector.getIsRefreshing);

   useEffect(() => {
      dispatch(AuthOperations.fetchCurrentUser());
   }, [dispatch]);

   return isRefreshing ? (
      <Loader />
   ) : (
      <Routes>
         <Route
            exact
            path="/"
            element={
               <PrivateRoute>
                  <HomeView />
               </PrivateRoute>
            }
         />
         <Route
            path="login"
            element={
               <PablicRoute restricted>
                  <LoginView />
               </PablicRoute>
            }
         />
         <Route
            path="register"
            element={
               <PablicRoute restricted>
                  <RegisterView />
               </PablicRoute>
            }
         />
         <Route path="*" element={<NotFoundView />} />
      </Routes>
   );
}
