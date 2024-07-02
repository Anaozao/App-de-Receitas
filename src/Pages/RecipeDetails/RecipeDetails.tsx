import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './RecipeDetails.module.css';
import { useEffect, useState } from 'react';
import { DrinkType, MealType, RecType } from '../../types';
import { fetchDetails } from '../../Utils/API';
import { useDispatch } from 'react-redux';
import { setTitle, setUrl } from '../../Redux/Actions';
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { IoShareSocial } from 'react-icons/io5';
import ReactLoading from 'react-loading';
import useLoacalStorage from '../../Hooks/useLoacalStorage';
import { Link } from 'react-router-dom';
import { getRecs, handleFavorite, handleShare, newRecipe, setIsFavorite } from '../../Utils/functions';

function RecipeDetails() {
  const { pathname } = useLocation();
  const [copyMessage, setCopyMessage] = useState('');
  const { id } = useParams();
  const [recipe, setRecipe] = useState<DrinkType | MealType>();
  const [recomendations, setRecomendations] = useState<RecType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [buttonText, setButtonText] = useState('Começar receita');
  const [isInProgress, setIsInProgress] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const { getItem } = useLoacalStorage();
    const inProgress = getItem('inProgress');
    const idparam = pathname.includes('comidas') ? 'idMeal' : 'idDrink'
    const find = inProgress.find((item: MealType | DrinkType) => item[idparam] === id)
    setButtonText(find ? 'Continuar receita' : 'Começar receita')
  }, [recipe])


  useEffect(() => {
    const { getItem } = useLoacalStorage();
    const recipesInProgress: [] = getItem('inProgress');
    const verify = recipesInProgress.find((item) => newRecipe(item).id === id)
    if (!verify) {
      setIsInProgress(false)
    } else {
      setIsInProgress(true)
    }
    setIsFavorite(id!, setIsFav)
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
    getRecs(pathname, setRecomendations)
    getRecipe()
    window.scrollTo(0, 0);
  }, [pathname])

  const recipeIngredients = recipe && Object.keys(recipe)
    .filter((key) => key.includes('Ingredient'))
    .filter((ingredient) => recipe[ingredient])

  const recipeMeasures = recipe && Object.keys(recipe)
  .filter((key) => key.includes('Measure'))
  .filter((measure) => recipe[measure])

  const handleStart = () => {
    const url = pathname.includes('comidas') ? `/comidas/${id}/em-progresso` : `/drinks/${id}/em-progresso`;
    const { setItem, getItem } = useLoacalStorage();
    const inProgressRecipes = getItem('inProgress');
    if (isInProgress) {
      navigate(url);
      return;
    }
    setItem('inProgress', [...inProgressRecipes, recipe])
    navigate(url);
  }

  return (
    <section className={styles.detailsPage}>
      {loading && <ReactLoading type={'spinningBubbles'} color={'black'} height={100} width={100} />}
      {recipe && (
        <>
          <div className={styles.basicInfo}>
            <img
              className={styles.image}
              src={newRecipe(recipe).image}
              alt=""
            />
            <h1
              className={styles.title}
            >
              {newRecipe(recipe).title}
            </h1>
            <p>{newRecipe(recipe).category}</p>
            <div className={styles.favAndShare}>
              <div className={styles.btnsDiv}>
                <button
                  onClick={() => handleFavorite(id!, setIsFav, newRecipe(recipe))}
                  className={styles.topBtns}
                >
                  {isFav ? <MdFavorite className={styles.icons}/> : <MdFavoriteBorder className={styles.icons}/>}
                </button>
                <button
                  onClick={() => handleShare(pathname, setCopyMessage)}
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
                src={newRecipe(recipe).video}
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
          <div
            className={styles.startBtnDiv}
          >
            <button
              onClick={handleStart}
              className={styles.startBtn}
            >
              {buttonText}
            </button>
          </div>
        </>
      )}
    </section>
  )
}

export default RecipeDetails;