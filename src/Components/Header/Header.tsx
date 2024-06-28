import { CgProfile } from 'react-icons/cg';
import styles from './Header.module.css';
import { HiOutlineSearch } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../types';
import { useEffect, useState } from 'react';
import Categories from './Categories/Categories';
import { IoHome } from 'react-icons/io5';
import SearchBar from './SearchBar/SearchBar';

function Header() {
  const [headerClass, setHeaderClass] = useState(styles.header);
  const [headerTopClass, setHeaderTopClass] = useState(styles.headerTop)
  const [isSearch, setIsSearch] = useState(false)
  const navigate = useNavigate()
  const { title, url } = useSelector((state: ReduxState) => state.generalReducer)
  const { pathname } = useLocation()

  useEffect(() => {
    if (url === '/comidas' || pathname === '/drinks') {
      setHeaderClass(styles.header)
      setHeaderTopClass(styles.headerTop)
    } else {
      setHeaderClass(styles.header2)
      setHeaderTopClass(styles.headerTop2)
    }
  }, [url])

  return (
    <header className={headerClass}>
      <div className={headerTopClass}>
        <button
        className={styles.headerTopBtns}
        onClick={() => navigate('/perfil')}
        >
          <CgProfile className={styles.headerIcons}/>
        </button>
        <p className={styles.headerTitle}>{ title }</p>
        {headerClass === styles.header ? (
          <button
            onClick={() => setIsSearch(!isSearch)}
            className={styles.headerTopBtns}
          >
            <HiOutlineSearch className={styles.headerIcons}/>
          </button>
        ) : (
          <button
            onClick={() => navigate('/comidas')}
            className={styles.headerTopBtns}
          >
            <IoHome className={styles.headerIcons}/>
          </button>
        )}
      </div>
      <div className={styles.headerBottom}>
        {headerClass === styles.header && (
          !isSearch ? (
            <Categories />
          ) : (
            <SearchBar />
          )
        )}
      </div>
    </header>
  )
}

export default Header;