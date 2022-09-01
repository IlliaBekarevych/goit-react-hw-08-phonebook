import { useState } from 'react';
import Container from '../Container/Container';
import s from './Form.module.css';
import sBtn from '../../App.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { AuthOperations, AuthSelector } from 'redux/auth';
import { NavLink } from 'react-router-dom';

export default function LoginView() {
   const dispatch = useDispatch();
   const isError = useSelector(AuthSelector.getError);
   const isLoading = useSelector(AuthSelector.getIsLoading);

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const onSubmitForm = async e => {
      e.preventDefault();
      dispatch(AuthOperations.logIn({ email, password }));

      if (!isError) {
         setEmail('');
         setPassword('');
      }
   };

   return (
      <Container>
         <h1>Login page</h1>
         <form className={s.form} onSubmit={onSubmitForm}>
            <label className={s.label}>
               Email
               <input
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  required
               />
            </label>
            <label className={s.label}>
               Password
               <input
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  value={password}
                  placeholder="XXXXXXX"
                  minLength={7}
                  required
               />
            </label>
            <div className={`${sBtn.btn} ${s.btn}`}>
               <button type="submit" disabled={isLoading}>
                  {isLoading ? 'Login...' : 'Login'}
               </button>
            </div>
            <NavLink to="/register">To register form.</NavLink>
         </form>
      </Container>
   );
}
