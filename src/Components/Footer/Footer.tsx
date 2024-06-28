import { GiMeal } from 'react-icons/gi';
import styles from './Footer.module.css'
import { BiSolidDrink } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate()
  return (
    <footer className={styles.footer}>
      <button
        onClick={() => navigate('/comidas')}
        className={styles.button}
      >
        <GiMeal className={styles.icons}/>
      </button>
      <button
        onClick={() => navigate('/drinks')}
        className={styles.button}
      >
        <BiSolidDrink className={styles.icons}/>
      </button>
    </footer>
  )
}

export default Footer;