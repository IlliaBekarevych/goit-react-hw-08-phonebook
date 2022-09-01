import { useState } from 'react';
import Container from '../Container/Container';
import s from './Form.module.css';
import sBtn from '../../App.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { AuthOperations, AuthSelector } from 'redux/auth';
import { NavLink } from 'react-router-dom';

export default function RegisterView() {
   const dispath = useDispatch();
   const isLoading = useSelector(AuthSelector.getIsLoading);
   const isError = useSelector(AuthSelector.getError);

   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const onSubmitForm = async e => {
      e.preventDefault();
      dispath(AuthOperations.register({ name, email, password }));
      if (!isError) {
         setName('');
         setEmail('');
         setPassword('');
      }
   };

   return (
      <Container>
         <h1>Register page</h1>
         <form className={s.form} onSubmit={onSubmitForm}>
            <label className={s.label}>
               Name
               <input
                  onChange={e => setName(e.target.value)}
                  type="name"
                  name="name"
                  value={name}
                  placeholder="Name"
                  required
               />
            </label>
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
            <div className={sBtn.btn + ' ' + s.btn}>
               <button type="submit" disabled={isLoading}>
                  Sign up
               </button>
            </div>
            <NavLink to="/login">To login form.</NavLink>
         </form>
      </Container>
   );
}
