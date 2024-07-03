import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import styles from './FavoriteCard.module.css';
import useLoacalStorage from '../../Hooks/useLoacalStorage';
import { useEffect, useState } from 'react';
import { Recipe, handleFavorite, handleShare } from '../../Utils/functions';
import { IoShareSocial } from 'react-icons/io5';
import { useDispatch } from 'react-redux';

type FavoriteCardProps = {
  id: string;
  title: string;
  image: string;
  type: string;
  recipe: Recipe;
}

function FavoriteCard({id, image, title, type, recipe}: FavoriteCardProps) {
  const { getItem } = useLoacalStorage();
  const [isFav, setIsFav] = useState(false)
  const [copyMessage, setCopyMessage] = useState('')
  const dispatch = useDispatch();
  
  const copyPath = type === 'comida' ? `/comidas/${id}` : `/drinks/${id}`

  useEffect(() => {
    const favorites: Recipe[] = getItem('favorites')
    const isFavorite = favorites.find((fav) => (fav.id === id) && (fav.type === type))
    if (isFavorite) {
      setIsFav(true)
    } else {
      setIsFav(false)
    }
  }, [])


  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src={image}
        alt={`imagem de ${title}`}
      />
      <p className={styles.title}>{title}</p>
      <div className={styles.buttonsDiv}>
        <button
          className={styles.buttons}
          onClick={() => handleFavorite(id, setIsFav, recipe, dispatch )}
        >
          <MdFavorite className={styles.icons}/>
        </button>
        <button
          onClick={() => handleShare( copyPath ,setCopyMessage)}
          className={styles.buttons}
        >
          <IoShareSocial className={styles.icons}/>
        </button>
      </div>
      {isFav && copyMessage}
    </div>
  )
}

export default FavoriteCard;