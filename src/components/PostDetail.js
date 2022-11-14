import React from 'react'
import { Link } from 'react-router-dom';

export const PostDetail = ({ post }) => {
    return (
        <div>
            <img src={post.image} alt={post.title} />
            <h2>{post.title}</h2>
            <p>{post.createdBy}</p>
            <div>
                {post.tags.map((tag, i) => (
                    <p key={i}>
                        <span>#</span>{tag}
                    </p>
                ))}
            </div>
            <Link className='btn btn-outline' to={`/posts/${post.id}`}>Ler</Link>
        </div>
    )
}
