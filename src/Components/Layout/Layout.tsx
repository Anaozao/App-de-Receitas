import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import styles from './Layout.module.css'
import { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import { ReduxState } from '../../types';
import { useSelector } from 'react-redux';

function Layout() {
  const [layoutClass, setLayoutClass] = useState(styles.layout)
  const { url } = useSelector((state: ReduxState) => state.generalReducer);

  useEffect(() => {
    if (url === '/comidas' || url === '/drinks') {
      setLayoutClass(styles.layout)
    } else {
      setLayoutClass(styles.layout2)
    }
  }, [url])

  return (
    <div className={layoutClass}>
        <Header />
      <main>
        <Outlet />
      </main>

      {url === '/comidas' || url === '/drinks' && <Footer />}
    </div>
  )
}

export default Layout;