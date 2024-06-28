import LoginForm from "../../Components/LoginForm/LoginForm";
import styles from './Login.module.css';

function Login() {
  return (
    <section className={styles.loginPage}>
      <LoginForm />
    </section>
  )
}

export default Login;