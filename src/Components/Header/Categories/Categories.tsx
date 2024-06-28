import { useLocation } from 'react-router-dom';
import styles from './Categories.module.css';
import { setRecipesByCategories, setRecipesByName } from '../../../Redux/Actions';
import { useDispatch } from 'react-redux';
import { Dispatch } from '../../../types';

function Categories() {
  const { pathname } = useLocation()
  const dispatch: Dispatch = useDispatch()

  const mealsCategories = ['Boi', 'Carneiro', 'Frango', 'Lanche', 'Sobremesa']
  const mealFetchData = ['Beef', 'Goat', 'Chicken', 'Breakfast', 'Dessert'];

  const drinksCategories = ['Comuns', 'Coqueteis', 'Shakes', 'Outros', 'Cacau']
  const drinkFetchData = [
    'Ordinary Drink',
    'Cocktail',
    'Shake',
    'Other/Unknown',
    'Cocoa'];

  const handleCategories = (category: string) => {
    const param = pathname === '/comidas' ? 'themealdb' : 'thecocktaildb';
    dispatch(setRecipesByCategories(param, category))
  }

  const allBtn = () => {
    const param = pathname === '/comidas' ? 'themealdb' : 'thecocktaildb';
    dispatch(setRecipesByName(param, ''))
  } 


  return (
    <section className={styles.categoriesSection}>
        {pathname === '/comidas' && (
          <div className={styles.categoriesDiv}>
            <button
              className={styles.categories}
              onClick={ allBtn }
            >
             Todas
            </button>
            {mealsCategories.map((cat, index) => (
              <button
                key={cat}
                onClick={() => handleCategories(mealFetchData[index])}
                className={styles.categories}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      {pathname === '/drinks' && (
        <div className={styles.categoriesDiv}>
        <button
          className={styles.categories}
          onClick={ allBtn }
        >
         Todas
        </button>
        {drinksCategories.map((cat, index) => (
          <button
            className={styles.categories}
            key={cat}
            onClick={() => handleCategories(drinkFetchData[index])}
          >
            {cat}
          </button>
        ))}
      </div>
      )}
    </section>
  )
}

export default Categories;