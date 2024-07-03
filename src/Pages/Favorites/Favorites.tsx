import { useEffect, useState } from 'react';
import useLoacalStorage from '../../Hooks/useLoacalStorage';
import styles from './Favorites.module.css';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTitle, setUrl } from '../../Redux/Actions';
import FavoriteCard from '../../Components/FavoriteCard/FavoriteCard';
import { Recipe } from '../../Utils/functions';
import { ReduxState } from '../../types';

function Favorites() {
  const {getItem} = useLoacalStorage();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [favs, setFavs] = useState<Recipe[]>([])
  const { favorites }= useSelector((state: ReduxState) => state.recipesReducer);

  useEffect(() => {
    dispatch(setTitle('Favoritos'));
    dispatch(setUrl(pathname));
    setFavs(getItem('favorites'))
  }, [favorites])

  return (
    <section className={styles.favoritesPage}>
      {favs.length < 1 && <h1>Nenhuma receita favoritada!</h1>}
      {favs.map((recipe) => (
        <FavoriteCard
          key={recipe.id}
          id={recipe.id!}
          title={recipe.title!}
          image={recipe.image!}
          recipe={recipe}
          type={recipe.type}
        />
      ))}
    </section>
  )
}

export default Favorites;