import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import styles from './Layout.module.css'
import { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import { ReduxState } from '../../types';
import { useSelector } from 'react-redux';
import useLoacalStorage from '../../Hooks/useLoacalStorage';

function Layout() {
  const [layoutClass, setLayoutClass] = useState(styles.layout)
  const { url } = useSelector((state: ReduxState) => state.generalReducer);
  const { getItem } = useLoacalStorage();
  const email = getItem('user')
  const navigate = useNavigate()

  useEffect(() => {
    if (url === '/comidas' || url === '/drinks') {
      setLayoutClass(styles.layout)
    } else {
      setLayoutClass(styles.layout2)
    }
  }, [url])

  if (email.length < 1) {
    navigate('/')
  }

  return (
    <div className={layoutClass}>
      <Header />

      <main className={styles.main}>
        <Outlet />
      </main>

      {(url === '/comidas' || url === '/drinks') && <Footer />}
    </div>
  )
}

export default Layout;