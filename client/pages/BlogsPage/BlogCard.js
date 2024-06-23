import React, { Component } from 'react';
import styles from './css/styles.css';
import { timeAgo } from '../utils';

class BlogCard extends Component {
  render() {
    const { blog } = this.props;

    return (
      <div className={styles.blogCard}>
        <img src={blog.image} alt={blog.title} className={styles.blogImage} />
        <div className={styles.blogContent}>
          <h3 className={styles.blogTitle}>{blog.title}</h3>
          <p className={styles.blogMeta}>
            <span>{timeAgo(blog.date)}</span> By {blog.author}
          </p>
          {/* <p className={styles.blogDescription}>{blog.description}</p> */}
        </div>
      </div>
    );
  }
}

export default BlogCard;
