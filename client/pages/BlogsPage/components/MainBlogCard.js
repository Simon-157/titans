import React, { Component } from 'react';
import styles from '../css/styles.css';
import { timeAgo } from '../../utils';
import { withRouter } from 'react-router-dom';

class MainBlogCard extends Component {
    render() {
        const { blog } = this.props;

        const handleClick = () => {
            this.props.history.push(`/blog/${blog.id}`);
        }

        const sanitizeHtml = (html) => {
            // TODO: Sanitize the html string to prevent XSS attacks
            return { __html: html };
        };


        return (
            <div className={styles.recentBlogWrapper}>

                <div className={styles.recentblogDetails} onClick={handleClick}>
                    <img src={blog.image} alt="Event Banner" />
                    <div className={styles.recentblogInfo}>
                        <h3>REIGN OF TITANS</h3>
                        <h2>{blog.title}</h2>
                        <p>{blog.description}</p>
                        <p>
                            <span>{timeAgo(blog.date)}</span> <span>By {blog.author} | {blog.readTime} min read</span>
                        </p>
                    </div>
                </div>

            </div>

        );
    }
}

export default withRouter(MainBlogCard);
