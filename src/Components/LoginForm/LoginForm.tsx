import React, { useState } from 'react';
import styles from './LoginForm.module.css'
import { useDispatch } from 'react-redux';
import { setLoginInfos } from '../../Redux/Actions';
import { useNavigate } from 'react-router-dom';
import useLoacalStorage from '../../Hooks/useLoacalStorage';

function LoginForm() {
  const [formInfos, setFormInfos] = useState({email: '', password: ''})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const storage = useLoacalStorage()


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInfos((prev) => (
      {
        ...prev,
        [e.target.name]: e.target.value,
      }
    ))
  }

  const handleLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(setLoginInfos(formInfos.email))
    storage.setItem('user', formInfos.email)
    navigate('/comidas')
  }

  const validadeForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const {email, password} = formInfos
    return (
      !emailRegex.test(email)
      || password.length < 6
    )
  }

  return (
    <form className={styles.form}>
      <p className={styles.title}>Login</p>
      <div>
        <label>
          <input
            className={styles.formInputs}
            type="email"
            onChange={handleChange}
            value={formInfos.email}
            name='email'
            placeholder='Email'
          />
        </label>
      </div>
      <div>
        <label>
          <input
            className={styles.formInputs}
            type="password"
            onChange={handleChange}
            value={formInfos.password}
            name='password'
            placeholder='Senha (min 6 caracteres)'
          />
        </label>
      </div>
      <div>
        <button
          className={styles.loginBtn}
          disabled={validadeForm()}
          onClick={handleLogin}
        >
          Entrar
        </button>
      </div>
    </form>
  )
}

export default LoginForm;