import { Link } from 'react-router-dom';
import styles from './DoneRecipeCard.module.css'

type DoneRecipeCardProps = {
  id: string;
  title: string;
  category: string;
  area: string;
  tags: string;
  doneDate: string;
  image: string;
  type: string
}

function DoneRecipeCard({ area, category, doneDate, id, image, tags, title, type }: DoneRecipeCardProps) {

  const url = type === 'comida' ? `/comidas/${id}` : `/drinks/${id}`

  return (
      <div className={styles.card}>
        <Link
          className={styles.link}
          to={url}>
          <img
            className={styles.image}
            src={image} alt={title}/>
          <p className={styles.title}>{title}</p>
          <div className={styles.infos}>
            <p>{category}</p>
            <p>{area}</p>
            <p>{tags}</p>
            <p>Finalizado em: {doneDate}</p>
          </div>
        </Link>
    </div>
  );
}

export default DoneRecipeCard;