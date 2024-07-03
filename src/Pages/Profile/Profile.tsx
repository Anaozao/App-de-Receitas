import { useEffect } from 'react';
import styles from './Profile.module.css';
import { useDispatch } from 'react-redux';
import { setTitle, setUrl } from '../../Redux/Actions';
import { useLocation, useNavigate } from 'react-router-dom';
import useLoacalStorage from '../../Hooks/useLoacalStorage';

function Profile() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { getItem } = useLoacalStorage();
  const navigate = useNavigate();
  const email = getItem('user')

  useEffect(() => {
    dispatch(setTitle('Perfil'))
    dispatch(setUrl(pathname))
  }, [])

  const handleLogout = () => {
    const { setItem } = useLoacalStorage();
    setItem('user', '')
    navigate('/')
  }

  return (
    <section className={styles.profilePage}>
      <div className={styles.profileInfos}>
        <p style={{ fontSize: '25px' }}>Usuário:</p>
        <p style={{ fontSize: '18px' }}>{email}</p>
        <div className={styles.topBtnsDiv}>
          <button
            onClick={() => navigate('/favoritos')}
            className={styles.topBtns}
          >
            Favoritos
          </button>
          <button
            onClick={() => navigate('/receitas-finalizadas')}
            className={styles.topBtns}
          >
            Receitas feitas
          </button>
          <button
            className={styles.topBtns}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  )
}

export default Profile;