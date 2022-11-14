import { db } from '../firebase/config';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth';

import { useState, useEffect } from 'react';

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIsCancelled() {
        if (cancelled) return;
    }

    const createUser = async (data) => {
        checkIsCancelled();

        setLoading(true);
        setError(null);

        try {
            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);

            await updateProfile(user, {
                displayName: data.name,
            });

            setLoading(false);

            return user;

        } catch (err) {

            setError({
                'auth/email-already-in-use': 'Já existe uma conta com o endereço de e-mail fornecido.',
                'auth/weak-password': 'Endereço de e-mail não é válido.',
                'auth/operation-not-allowed': 'Operação não permitida',
                'auth/weak-password': 'A senha é muito fraca'
            }[err.code] || 'Ocorreu um erro');

            setLoading(false);
        }


    }

    const logout = () => {
        checkIsCancelled();
        signOut(auth);
    }

    const login = async (data) => {
        checkIsCancelled();

        setLoading(true);
        setError(false);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);

        } catch (error) {
            let systemErrorMessage;

            if (error.message.includes("user-not-found")) {
                systemErrorMessage = "Usuário não encontrado.";
            } else if (error.message.includes("wrong-password")) {
                systemErrorMessage = "Senha incorreta!.";
            } else {
                systemErrorMessage = "Ocorreu um error, por favor tente mais tarde.";
            }

            setError(systemErrorMessage);
        }
        setLoading(false);
    }


    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }
}
