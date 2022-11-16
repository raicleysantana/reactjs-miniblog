import React, { useEffect, useState } from 'react'
import styles from './EditPost.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';

function EditPost() {
    const { id } = useParams();
    const { document: post } = useFetchDocument('posts', id);
    const { updateDocument, response } = useUpdateDocument('posts');

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");


    const { user } = useAuthValue();
    const navigate = useNavigate();
    const [image_preview, setImage_preview] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

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

        const data = {
            title,
            image,
            body,
            tags: tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        };

        updateDocument(id, data);

        navigate('/dashboard');

    }

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setBody(post.body);
            setImage(post.image);
            setImage_preview(post.image);
            const textTags = post.tags.join(', ');
            setTags(textTags);
        }
    }, [post]);

    return (
        <div className={styles.edit_post}>
            {post && (
                <>
                    <h2>Editando post: {post.title}</h2>

                    <p>Altere como desejar</p>



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
                                onChange={(e) => {
                                    setImage(e.target.value);
                                    setImage_preview(e.target.value);
                                }}
                                value={image_preview}
                            />
                        </label>

                        <p className={styles.preview_title}>Preview da imagem atual: </p>

                        <img className={styles.image_preview} src={image_preview} alt={post.title} />

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
                </>
            )}
        </div>

    )
}

export default EditPost