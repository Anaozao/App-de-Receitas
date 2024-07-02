import ReactLoading from 'react-loading';
import styles from './InProgress.module.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DrinkType, MealType } from '../../types';
import { useDispatch } from 'react-redux';
import { Recipe, handleFavorite, handleShare, newRecipe, setIsFavorite } from '../../Utils/functions';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { IoShareSocial } from 'react-icons/io5';
import { setTitle, setUrl } from '../../Redux/Actions';
import { fetchDetails } from '../../Utils/API';
import useLoacalStorage from '../../Hooks/useLoacalStorage';

function InProgress() {

  const { pathname } = useLocation();
  const [copyMessage, setCopyMessage] = useState('');
  const { id } = useParams();
  const [recipe, setRecipe] = useState<DrinkType | MealType>();
  const [loading, setLoading] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [checked, setChecked] = useState<string[]>([])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recipeType = pathname.includes('comidas') ? 'comida' : 'drink'
  const param = pathname.includes('comidas') ? 'comidas' : 'drinks';

  useEffect(() => {
    const { getItem } = useLoacalStorage();
    const recipesInProgress: [] = getItem('inProgress');
    const verify = recipesInProgress.find((item) => newRecipe(item).id === id)
    if (!verify) {
      alert('Receita não iniciada! Você será redirecionado(a) para a página da receita.')
      navigate(`/${param}/${id}`)
    }
    const ingredientsInProgress = getItem('ingredientsInProgress')
    setChecked(ingredientsInProgress)
    setIsFavorite(id!, setIsFav)
    dispatch(setUrl(pathname))
    dispatch(setTitle('Receita em progresso'))
    const getRecipe = async () => {
      setLoading(true)
      const param = pathname.includes('comidas') ? 'themealdb' : 'thecocktaildb';
      const type = pathname.includes('comidas') ? 'meals' : 'drinks';
      const response = await fetchDetails(param, id!)
      setRecipe(response[type][0]);
      setLoading(false)
    }
    getRecipe()
    window.scrollTo(0, 0);
  }, [pathname])

  const recipeIngredients = recipe && Object.keys(recipe)
  .filter((key) => key.includes('Ingredient'))
  .filter((ingredient) => recipe[ingredient])

  const recipeMeasures = recipe && Object.keys(recipe)
  .filter((key) => key.includes('Measure'))
  .filter((measure) => recipe[measure])

  const handleCheck = (ing: string) => {
    const {setItem} = useLoacalStorage()
    
    const isCheckd = checked.find((item) => item === ing);
    if (isCheckd) {
      const filter = checked.filter((item) => item !== ing);
      setChecked(filter);
      setItem('ingredientsInProgress', filter)
      return;
    }
    setChecked([...checked, ing])
    setItem('ingredientsInProgress', [...checked, ing])
  }

  return (
    <section className={styles.inProgressPage}>
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
              <label
                className={`${styles.ingredient} ${checked.includes(`${recipeType}(${id}): ${ing}`) && styles.checked}`}
                key={ing}
              >
                <input
                  type="checkbox"
                  onClick={() => handleCheck(`${recipeType}(${id}): ${ing}`)}
                  checked={checked.includes(`${recipeType}(${id}): ${ing}`)}
                />
                {recipe[ing]}: {recipe[recipeMeasures![index]]}
              </label>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default InProgress;