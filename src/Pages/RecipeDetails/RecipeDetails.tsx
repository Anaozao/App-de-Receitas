import { useLocation, useParams } from 'react-router-dom';
import styles from './RecipeDetails.module.css';
import { useEffect, useState } from 'react';
import { DrinkType, MealType, RecType } from '../../types';
import { fetchByName, fetchDetails } from '../../Utils/API';
import { useDispatch } from 'react-redux';
import { setTitle, setUrl } from '../../Redux/Actions';
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { IoShareSocial } from 'react-icons/io5';
import ReactLoading from 'react-loading';
import useLoacalStorage from '../../Hooks/useLoacalStorage';
import { Link } from 'react-router-dom';

function RecipeDetails() {
  const { pathname } = useLocation();
  const [copyMessage, setCopyMessage] = useState('')
  const { id } = useParams()
  const [recipe, setRecipe] = useState<DrinkType | MealType>()
  const [recomendations, setRecomendations] = useState<RecType[]>()
  const [loading, setLoading] = useState(false)
  const [isFav, setIsFav] = useState(false)
  const dispatch = useDispatch()

  const setFavorite = (id: string) => {
    const { getItem } = useLoacalStorage();
    const favorites: DrinkType[] | MealType[] = getItem('favorites');
    const isFavorite = favorites.find((fav) => fav.id === id);
    if (isFavorite) {
      setIsFav(true)
      return;
    }
    setIsFav(false)
  }

  const getRecs = async () => {
    const param = pathname.includes('comidas') ? 'thecocktaildb' : 'themealdb';
    const type = pathname.includes('comidas') ? 'drinks' : 'meals';
    const response = await fetchByName(param, '')
    // console.log(response[type]);
    
    const recs = response[type].slice(0, 6)
    const newRecs = recs.map((rec: MealType | DrinkType) => (
      {
        title: rec.strMeal || rec.strDrink,
        image: rec.strMealThumb || rec.strDrinkThumb,
        id: rec.idMeal || rec.idDrink,
      }
    ))
    
    setRecomendations(newRecs)
  }

  useEffect(() => {
    setFavorite(id!)
    dispatch(setUrl(pathname))
    dispatch(setTitle('Detalhes da receita'))
    const getRecipe = async () => {
      setLoading(true)
      const param = pathname.includes('comidas') ? 'themealdb' : 'thecocktaildb';
      const type = pathname.includes('comidas') ? 'meals' : 'drinks';
      const response = await fetchDetails(param, id!)
      setRecipe(response[type][0]);
      setLoading(false)
    }
    getRecs()
    getRecipe()
    window.scrollTo(0, 0);
  }, [pathname])

  const recipeIngredients = recipe && Object.keys(recipe)
    .filter((key) => key.includes('Ingredient'))
    .filter((ingredient) => recipe[ingredient])

  const recipeMeasures = recipe && Object.keys(recipe)
  .filter((key) => key.includes('Measure'))
  .filter((measure) => recipe[measure])

  const newRecipe = () => {
    return {
      title: recipe?.strMeal || recipe?.strDrink,
      image: recipe?.strMealThumb || recipe?.strDrinkThumb,
      category: recipe?.strCategory || '',
      description: recipe?.strInstructions,
      video: recipe?.strYoutube ? `https://www.youtube.com/embed/${recipe?.strYoutube.split('=')[1]}` : undefined,
      id: recipe?.idDrink || recipe?.idMeal,
    }
  }
  
  const handleShare = async () => {
    navigator.clipboard.writeText(`${pathname}`)
    setCopyMessage('Link copiado')
    setTimeout(() => {
      setCopyMessage('')
    }, 3000)
  }

  const handleFavorite = (id: string) => {
    const { getItem, setItem } = useLoacalStorage()
    const favorites: DrinkType[] | MealType[] = getItem('favorites')
    const isFavorite = favorites.find((fav) => fav.id === id);
    
    
    if (isFavorite) {
      setIsFav(false)
      const newFavs = favorites
        .filter((fav) => fav.id !== id)
      setItem('favorites', newFavs )
      return;
    }
    setIsFav(true)
    const item = newRecipe()
    setItem('favorites', [...favorites, item ])
  }
  
  return (
    <section className={styles.detailsPage}>
      {loading && <ReactLoading type={'spinningBubbles'} color={'black'} height={100} width={100} />}
      {recipe && (
        <>
          <div className={styles.basicInfo}>
            <img
              className={styles.image}
              src={newRecipe().image}
              alt=""
            />
            <h1
              className={styles.title}
            >
              {newRecipe().title}
            </h1>
            <p>{newRecipe().category}</p>
            <div className={styles.favAndShare}>
              <div className={styles.btnsDiv}>
                <button
                  onClick={() => handleFavorite(newRecipe().id!)}
                  className={styles.topBtns}
                >
                  {isFav ? <MdFavorite className={styles.icons}/> : <MdFavoriteBorder className={styles.icons}/>}
                </button>
                <button
                  onClick={handleShare}
                  className={styles.topBtns}
                >
                  <IoShareSocial className={styles.icons}/>
                </button>
              </div>
              {copyMessage}
            </div>
          </div>
          <div className={styles.ingredientsDiv}>
            <p className={styles.ingredientTitle}>Ingredientes</p>
            {recipeIngredients?.map((ing, index) => (
              <p
                className={styles.ingredient}
                key={ing}
              >
                {recipe[ing]}: {recipe[recipeMeasures![index]]}
              </p>
            ))}
          </div>
          {pathname.includes('comidas') && (
            <div className={styles.videoDiv}>
              <iframe
                src={newRecipe().video}
                width="560"
                height="315"
                className={styles.video}
                allow="accelerometer; autoplay; clipboard-write;
                encrypted-media; gyroscope; picture-in-picture"
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen
              /> 
          </div>
          )}
          <div className={styles.recsDiv}>
            {recomendations?.map((rec) => (
              <Link 
                key={rec.id}
                className={styles.recLink}
                to={pathname.includes('comidas') ? `/drinks/${rec.id}` : `/comidas/${rec.id}`}
              >
                <div>
                  <img className={styles.recImg} src={rec.image} alt={rec.title} />
                  <p className={styles.recTitle}>{rec.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default RecipeDetails;