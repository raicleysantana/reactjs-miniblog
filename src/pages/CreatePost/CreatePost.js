import React, { useEffect, useState } from 'react'
import styles from './CreatePost.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';

function CreatePost() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    const { insertDocument, response } = useInsertDocument("posts");
    const { user } = useAuthValue();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('form');

        setFormError("");

        //validar url da image
        try {
            new URL(image);
        } catch (error) {
            setFormError("A imagem precisa ser uma URL");
        }

        //Criar um array de tags
        const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());

        if (!title || !image || !body || !body || !tags) setFormError('Por favor preencha todos os campos!');

        if (formError) return;

        insertDocument({
            title,
            image,
            body,
            tags: tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        });

        navigate('/');

    }

    useEffect(() => {
        console.log(user.uid);
    }, []);

    return (
        <div className={styles.create_post}>
            <h2>Criar post</h2>

            <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>



            <form onSubmit={handleSubmit}>
                {response.error && <p className="error">{response.error}</p>}
                {formError && <p className="error">{formError}</p>}

                <label>
                    <span>Titulo:</span>
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder="Pense num bom título"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </label>

                <label>
                    <span>URL da imagem:</span>
                    <input
                        type="text"
                        name="image"
                        required
                        placeholder="Insira uma image que representa o seu post"
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                    />
                </label>

                <label>
                    <span>Conteúdo:</span>
                    <textarea
                        name="body"
                        required
                        placeholder="Insira o conteúdo do post"
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                    ></textarea>
                </label>

                <label>
                    <span>Tags:</span>
                    <input
                        type="text"
                        name="tags"
                        required
                        placeholder="Insira as tags separadas por virgulas"
                        onChange={(e) => setTags(e.target.value)}
                        value={tags}
                    />
                </label>

                {!response.loading && <button type="submit" className="btn">Cadastrar</button>}

                {response.loading && <button type="submit" className="btn" disabled>Aguarde...</button>}
            </form>
        </div>
    )
}

export default CreatePost