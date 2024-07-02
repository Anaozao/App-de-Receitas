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

  useEffect(() => {
    dispatch(setTitle('Receitas Feitas'))
    dispatch(setUrl(pathname))
    const { getItem } = useLoacalStorage();
    setDoneRecipes(getItem('doneRecipes'));
  }, []);
  return (
    <section className={styles.donePage}>
      <div className={styles.topBtnsDiv}>
        <button
          className={styles.topBtns}
          >
            Todas
          </button>
        <button
          className={styles.topBtns}
        >
          Comidas
        </button>
        <button
          className={styles.topBtns}
        >
          Drinks
        </button>
      </div>
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