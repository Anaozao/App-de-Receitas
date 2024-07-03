import { useState } from 'react';
import styles from './SearchBar.module.css'
import { setRecipesByIngredient, setRecipesByLetter, setRecipesByName } from '../../../Redux/Actions';
import { Dispatch } from '../../../types';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

function SearchBar() {
  const dispatch: Dispatch = useDispatch()
  const { pathname } = useLocation()
  const [searchForm, setSearchForm] = useState(
    {
      search: '',
      radio: 'name',
    }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchForm((prev) => (
      {
        ...prev,
        [e.target.name]: e.target.value
      }
    ))
  }

  const handleSearch = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const { search, radio } = searchForm
    const param = pathname === '/comidas' ? 'themealdb' : 'thecocktaildb';
    switch (radio) {
      case 'name':
        dispatch(setRecipesByName(param, search))
        break;
      case 'ingredient': 
        dispatch(setRecipesByIngredient(param, search))
        break;
      default:
        if (search.length > 1) {
          alert('Digine apenas um caractere para esse filtro de busca')
          return;
        }
        dispatch(setRecipesByLetter(param, search))    
    }
  }


  return (
    <section className={styles.searchSection}>
      <form className={styles.form}>
        <div>
          <label htmlFor="search-input">
            <input
              onChange={ handleChange }
              type="text"
              name='search'
              placeholder='Busque a receita'
              className={styles.searchInput}
            />
          </label>
        </div>
        <div className={styles.radiosContainer}>
          <div className={styles.radioDiv}>
            <label 
              className={styles.radioLabel}
              htmlFor="name-radio"
            >
              Nome
            </label>
            <input
              onChange={ handleChange }
              type="radio"
              id='name-radio'
              name='radio'
              value='name'
              className={styles.radios}
              defaultChecked
            />
          </div>

          <div className={styles.radioDiv}>
            <label
              className={styles.radioLabel}
              htmlFor="ingredient-radio"
            >
              Ingrediente
            </label>
            <input
              onChange={ handleChange }
              type="radio"
              id='ingredient-radio'
              name='radio'
              value='ingredient'
              className={styles.radios}
            />
          </div>

         <div className={styles.radioDiv}>
            <label
              className={styles.radioLabel}
              htmlFor="letter-radio"
            >
              Letra
            </label>
            <input
              onChange={ handleChange }
              type="radio"
              id='letter-radio'
              name='radio'
              value='letter'
              className={styles.radios}
            />
         </div>
        </div>
        <button
          onClick={handleSearch}
          className={styles.searchBtn}
        >
          Pesquisar
        </button>
      </form>
    </section>
  )
}

export default SearchBar;