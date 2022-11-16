import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery';
import { PostDetail } from '../../components/PostDetail';
import styles from './Search.module.css';

export const Search = () => {
    const query = useQuery();
    const search = query.get('q');

    const { documents: posts } = useFetchDocuments('posts', search);

    return (
        <div className={styles.search_container}>
            <h2>Search</h2>

            <div>
                {posts && posts.length == 0 && (
                    <div className={styles.nopost}>
                        <p>Não foram encontrados posts a partir de suas busca...</p>
                        <Link className='btn btn-dark' to={'/'}>Voltar</Link>
                    </div>
                )}
                {posts && posts.map((post) => (
                    <PostDetail key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}
