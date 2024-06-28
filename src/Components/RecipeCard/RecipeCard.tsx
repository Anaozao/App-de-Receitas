import { Link, useLocation } from 'react-router-dom';
import styles from './RecipeCard.module.css';

type RecipeCardProps = {
  id: string;
  title: string;
  thumbnail: string
}

function RecipeCard({ id, thumbnail, title }: RecipeCardProps) {
  const { pathname } = useLocation()
  return (
    <div className={styles.card}>
      <Link
        className={styles.link}
        to={pathname.includes('comidas') ? `/comidas/${id}` : `/drinks/${id}`}
      >
        <div className={styles.nameDiv}>
          <p className={styles.title}>{ title }</p>
        </div>
        <img className={styles.image} src={thumbnail} alt={title} />
      </Link>
    </div>
  )
}

export default RecipeCard;