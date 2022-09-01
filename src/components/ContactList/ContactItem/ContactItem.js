import PropTypes from 'prop-types';
import s from './ContactItem.module.css';
import sBtn from '../../../App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { ContactsOperations, ContactsSelectors } from 'redux/contacts';
import { toast } from 'react-toastify';
import { useState } from 'react';

export default function ContactItem({ id, name, number }) {
   const [changeName, setChangeName] = useState(name);
   const [changeNumber, setChangeNumber] = useState(number);
   const [changeContact, setChangeContact] = useState(false);
   const contacts = useSelector(ContactsSelectors.getContacts);
   const dispatch = useDispatch();

   const handelChengeContact = () => {
      if (changeContact) {
         if (name === changeName && number === changeNumber) {
            setChangeContact(!changeContact);
            return;
         }
         if (
            contacts.find(
               contact =>
                  contact.name.toLocaleLowerCase() ===
                     changeName.toLocaleLowerCase() && contact.id !== id
            )
         ) {
            toast.warning(`${changeName} is alredy in contacts`);
            return;
         }
         dispatch(
            ContactsOperations.changeContact({
               id,
               name: changeName,
               number: changeNumber,
            })
         );
      }
      setChangeContact(!changeContact);
   };

   return (
      <li className={s.item} id={id}>
         {changeContact ? (
            <>
               <input
                  className={s.input}
                  type="name"
                  name="name"
                  value={changeName}
                  placeholder="Name Lastname"
                  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                  required
                  onChange={e => setChangeName(e.target.value)}
               />
               <input
                  className={s.input}
                  type="tel"
                  name="number"
                  value={changeNumber}
                  placeholder="XXX-XX-XX"
                  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                  required
                  onChange={e => setChangeNumber(e.target.value)}
               />
            </>
         ) : (
            <>
               <span className={s.name}>{name}: </span>
               <span>{number}</span>
            </>
         )}
         <div className={s.BlockButtons}>
            <div className={`${sBtn.btn} ${s.btn} ${s.btnEdit}`}>
               <button type="button" onClick={handelChengeContact}>
                  {changeContact ? 'Save' : 'Edit'}
               </button>
            </div>
            <div className={`${sBtn.btn} ${s.btn}`}>
               <button
                  type="button"
                  onClick={() => dispatch(ContactsOperations.deleteContact(id))}
               >
                  Delete
               </button>
            </div>
         </div>
      </li>
   );
}

ContactItem.propTypes = {
   id: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   number: PropTypes.string.isRequired,
};
