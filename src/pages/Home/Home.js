import React, { useState } from "react";
import styles from './Home.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { PostDetail } from "../../components/PostDetail";

const Home = () => {
    const [query, setQuery] = useState('');
    const { documents: posts, loading } = useFetchDocuments('posts');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className={styles.home}>
            <h1>Veja nossos posts mais recentes </h1>

            <form onSubmit={handleSubmit} className={styles.search_form}>
                <input
                    type="text"
                    placeholder="Ou busque por tags..."
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                />
                <button className="btn btn-dark">Pesquisar</button>
            </form>

            <div>
                <h1>Posts</h1>

                {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}

                {posts && posts.lenght === 0 && (
                    <div className={styles.nopost}>
                        <p>Não foram encontrados posts</p>
                        <Link to={"/post/create"} className="btn">Criar o primeiro post</Link>
                    </div>
                )}
            </div>
        </div>
    )
}


export default Home;