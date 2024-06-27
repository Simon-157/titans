import React, { Component } from 'react';
import BlogCard from './BlogCard';
import styles from '../css/styles.css';
import { Link } from 'react-router-dom';

class BlogList extends Component {
    render() {
        const { blogs } = this.props;

        return (
            <div className={styles.blogList}>
                {blogs.map((blog, index) => (
                    <Link to={`/blog/${blog.id}`} key={index}>
                        <BlogCard key={index} blog={blog} />
                    </Link>
                ))}
            </div>
        );
    }
}

export default BlogList;
