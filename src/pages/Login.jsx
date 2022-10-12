
import React, { useContext } from 'react';
import MyButton from '../components/UI/button/MyButton';
import MyInput from '../components/UI/input/MyInput';
import { AuthContext } from '../context';

function Login() {

    const {isAuth, setIsAuth} = useContext(AuthContext);

    const Submit = (e) => {
        e.preventDefault();
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
    }

    return (
        <div>
            <h1>Сторінка авторизації</h1>
            <form onSubmit={Submit}>
                <MyInput type="text" placeholder="Введіть логін"/>
                <MyInput type="password" placeholder="Введіть пароль"/>
                <MyButton>Увійти</MyButton>
            </form>
        </div>
    )
}
export default Login