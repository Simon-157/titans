import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/others.css';

class Card extends Component {
  render() {
    const { title, image, author, time } = this.props;
    return (
      <div className={styles.card}>
        <img src={image} alt="Game" className={styles.image} />
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.info}>{time} <span>By {author}</span></p>
        </div>
      </div>
    );
  }
}


class OtherBlogList extends Component {
  render() {
    
    const {allBlogs} = this.props;

    return (
      <div className={styles.grid}>
        {allBlogs.map((blog, index) => (
            <Link to={`/blog/${blog.id}`} key={index}>
                <Card
                    key={index}
                    title={blog.title}
                    image={blog.image}
                    author={blog.author}
                    time={blog.time}
                />
            </Link>
        ))}
      </div>
    );
  }
}

export default OtherBlogList;
