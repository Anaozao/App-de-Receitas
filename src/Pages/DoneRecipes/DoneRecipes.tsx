import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTitle, setUrl } from "../../Redux/Actions";
import { useLocation } from "react-router-dom";
import { Recipe } from "../../Utils/functions";
import useLoacalStorage from "../../Hooks/useLoacalStorage";
import styles from './DoneRecipes.module.css'
import DoneRecipeCard from "../../Components/DoneRecipeCard/DoneRecipeCard";

function DoneRecipes() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [doneRecipes, setDoneRecipes] = useState<Recipe[]>([]);
  const [buttonClass, setButtonClass] = useState('all')

  useEffect(() => {
    dispatch(setTitle('Receitas Feitas'))
    dispatch(setUrl(pathname))
    const { getItem } = useLoacalStorage();
    setDoneRecipes(getItem('doneRecipes'));
  }, []);

  const handleType = (type: string) => {
    const { getItem } = useLoacalStorage()
    const all: Recipe[] = getItem('doneRecipes');
    const meals = all.filter((rec) => rec.type === 'comida')
    const drinks = all.filter((rec) => rec.type === 'drink')
    switch (type) {
      case 'todas':
      setDoneRecipes(all)
      setButtonClass('all')
      break;
      case 'comidas':
        setButtonClass('meals')
        setDoneRecipes(meals)
        break;
      default:
        setButtonClass('drinks')
        setDoneRecipes(drinks);
    }
  }

  return (
    <section className={styles.donePage}>
      <div className={styles.topBtnsDiv}>
        <button
          onClick={() => handleType('todas')}
          className={`${styles.topBtns} ${buttonClass === 'all' && styles.selected}`}
          >
            Todas
          </button>
        <button
          onClick={() => handleType('comidas')}
          className={`${styles.topBtns} ${buttonClass === 'meals' && styles.selected}`}
        >
          Comidas
        </button>
        <button
          onClick={() => handleType('drinks')}
          className={`${styles.topBtns} ${buttonClass === 'drinks' && styles.selected}`}
        >
          Drinks
        </button>
      </div>
      {doneRecipes.length < 1 && <h1>Nenhuma receita feita!</h1>}
      <div className={styles.doneRecipesDiv}>
        {doneRecipes?.map((recipe) => (
          <DoneRecipeCard 
            area={recipe.area}
            category={recipe.category}
            doneDate={recipe.doneDate!}
            id={recipe.id!}
            image={recipe.image!}
            tags={recipe.tags}
            title={recipe.title!}
          />
        ))}
      </div>
    </section>
  )
}

export default DoneRecipes;