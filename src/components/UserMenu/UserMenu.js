import React from 'react';
import sBtn from '../../App.module.css';
import s from './UserMenu.module.css';
import defaultAvatar from '../../images/default-avatar.png';
import { useSelector, useDispatch } from 'react-redux';
import { AuthOperations, AuthSelector } from 'redux/auth';

export default function UserMenu() {
   const email = useSelector(AuthSelector.getEmail);
   const dispatch = useDispatch();

   return (
      <div className={s.container}>
         <img
            className={s.avatar}
            src={defaultAvatar}
            alt="avatar"
            width="32"
         />
         <span className={s.text}>Welcome {email}</span>
         <div className={sBtn.btn + ' ' + s.btn}>
            <button
               type="button"
               onClick={() => dispatch(AuthOperations.logOut())}
            >
               logout
            </button>
         </div>
      </div>
   );
}
