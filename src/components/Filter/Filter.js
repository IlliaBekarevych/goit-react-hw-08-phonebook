import PropTypes from 'prop-types';
import s from './Filter.module.css';

export default function Filter({ filter, onChange }) {
   return (
      <label className={s.label}>
         Find contact by name
         <input
            type="text"
            name="filter"
            placeholder="Enter some letters to search"
            value={filter}
            onChange={e => onChange(e.target.value)}
         />
      </label>
   );
}

Filter.propTypes = {
   filter: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
};
