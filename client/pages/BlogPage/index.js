import React, { Component } from 'react';
import { blogsData } from './dummyData';
import styles from './css/styles.css';
import { withRouter } from 'react-router-dom';
import { timeAgo } from '../utils';
import Navbar from '../EventsPage/NavBar';


class BlogDetail extends Component {
    // TODO: Based on the blogId in the url, make a query to the server to get the blog data using the blogId instead of using the dummy data from ./data
    constructor(props) {
        super(props);
        const blogId = this.props.match.params.blogId;
        console.log(blogId);
        const blog = blogsData.find((b) => b.id === parseInt(blogId));
        console.log(blog);
        this.state = { blog };
    }

    render() {
        const { blog } = this.state;
        if (!blog) return <div className={styles.blogDetail}>Blog not found.</div>;

        const sanitizeHtml = (html) => {
            // TODO: Sanitize the html string to prevent XSS attacks
            return { __html: html };
        };

        return (
            <div className={styles.blogDetail}>
                <Navbar />
                <section className={styles.content}>
                    <header className={styles.header}>
                        <h1>{blog.title}</h1>
                    </header>
                    <img src={blog.image} alt={blog.title} className={styles.mainImage} />
                    <div className={styles.description}>
                        <section className={styles.authorInfo}>
                            <p><span>{timeAgo(blog.date)} </span>By {blog.author} | {blog.readTime} min read</p>
                        </section>
                        <div className="blog-description" dangerouslySetInnerHTML={sanitizeHtml(blog.description)} />
                    </div>
                </section>
            </div>
        );
    }
}

export default withRouter(BlogDetail);
