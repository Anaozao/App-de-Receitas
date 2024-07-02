import styles from './DoneRecipeCard.module.css'

type DoneRecipeCardProps = {
  id: string;
  title: string;
  category: string;
  area: string;
  tags: string;
  doneDate: string;
  image: string;
}

function DoneRecipeCard({ area, category, doneDate, id, image, tags, title }: DoneRecipeCardProps) {
  return (
      <div className={styles.card}>
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
    </div>
  );
}

export default DoneRecipeCard;