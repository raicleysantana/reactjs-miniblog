import React from 'react'
import styles from './Login.module.css';
import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    const { login, error: authError } = useAuthentication();

    useEffect(() => {
        if (authError) setError(authError);
    }, [authError]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            email,
            password
        };

        const res = await login(user);
    }


    return (
        <div className={styles.login}>
            <h1>Entrar</h1>

            <p>Crie seu usuário e compartilhe suas histórias</p>


            <form onSubmit={handleSubmit}>

                {error && <p className="error">{error}</p>}

                <label>
                    <span>E-Mail:</span>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="E-Mail do usuário"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                <label>
                    <span>Senha:</span>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Insira sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                {!loading && <button type="submit" className="btn">Entrar</button>}

                {loading && <button type="submit" className="btn" disabled>Aguarde...</button>}
            </form>
        </div>
    )
}

export default Login;
