import React from 'react'
import styles from './Register.module.css';
import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const { createUser, error: authError, loading } = useAuthentication();




    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirm_password) {
            setError("As senhas precisam ser iguais");
            return false;
        }

        const user = {
            name,
            email,
            password
        };

        const res = await createUser(user);

        console.log(res);

    }

    useEffect(() => {
        if (authError) setError(authError);
    }, [authError]);

    return (
        <div className={styles.register}>
            <h1>Cadastre-se para postar</h1>

            <p>Crie seu usuário e compartilhe suas histórias</p>


            <form onSubmit={handleSubmit}>

                {error && <p className="error">{error}</p>}


                <label>
                    <span>Nome:</span>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="Nome do usuário"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>

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

                <label>
                    <span>Confirmação de Senha:</span>
                    <input
                        type="password"
                        name="confirm_password"
                        required
                        placeholder="Confirme a sua senha"
                        value={confirm_password}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </label>

                {!loading && <button type="submit" className="btn">Cadastrar</button>}

                {loading && <button type="submit" className="btn" disabled>Aguarde...</button>}
            </form>
        </div>
    )
}

export default Register