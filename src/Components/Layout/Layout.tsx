import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import styles from './Layout.module.css'
import { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';

function Layout() {
  const [layoutClass, setLayoutClass] = useState(styles.layout)
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === '/comidas' || pathname === '/drinks') {
      setLayoutClass(styles.layout)
    } else {
      setLayoutClass(styles.layout2)
    }
  }, [pathname])

  return (
    <div className={layoutClass}>
        <Header />
      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Layout;