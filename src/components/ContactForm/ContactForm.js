import { useState } from 'react';
import s from './ContactForm.module.css';
import sBtn from '../../App.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { ContactsOperations, ContactsSelectors } from 'redux/contacts';

export default function ContactForm() {
   const [name, setName] = useState('');
   const [number, setNumber] = useState('');

   const contacts = useSelector(ContactsSelectors.getContacts);
   const isRefreshing = useSelector(ContactsSelectors.getIsRefreshing);
   const dispatch = useDispatch();

   const onSubmitForm = e => {
      e.preventDefault();
      if (
         contacts.find(
            contact =>
               contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
         )
      ) {
         toast.warning(`${name} is alredy in contacts`);
         return;
      }
      dispatch(ContactsOperations.addContact({ name, number }));
      setName('');
      setNumber('');
   };

   return (
      <form className={s.form} onSubmit={onSubmitForm}>
         <label className={s.label}>
            Name
            <input
               onChange={e => setName(e.target.value)}
               type="text"
               name="name"
               value={name}
               placeholder="Name"
               pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
               title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
               required
            />
         </label>
         <label className={s.label}>
            Number
            <input
               onChange={e => setNumber(e.target.value)}
               type="tel"
               name="number"
               value={number}
               placeholder="XXX-XX-XX"
               pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
               title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
               required
            />
         </label>
         <div className={sBtn.btn + ' ' + s.btn}>
            <button type="submit" disabled={isRefreshing}>
               Add contact
            </button>
         </div>
      </form>
   );
}
