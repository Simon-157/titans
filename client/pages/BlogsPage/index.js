import React, { Component } from 'react';
import MainBlogCard from './MainBlogCard';
import BlogList from './BlogList';
import styles from './css/styles.css';
import Navbar from '../EventsPage/NavBar';
import OtherBlogList from './OtherBlogs';
import Footer from '../EventsPage/Footer';
import SearchBox from './SearchBox';
import { blogsData } from './dummyData';

class BlogsPage extends Component {
    // TODO:Oncomponent mount; FETCH the most recent blog posts from the server as the latestBlog, 4 recentBlogs, and allBlogs state from the api endpoints
    state = {
        latestBlog: blogsData[0],
        recentBlogs: blogsData.slice(1, 5),
        allBlogs: blogsData
    };

    render() {
        const { latestBlog, recentBlogs, allBlogs } = this.state;

        return (
            <main className={styles.app}>
                <Navbar /><div className={styles.blogspageWrapper}>
                    <SearchBox />
                    <div className={styles.allBlogsPage}>
                        <MainBlogCard blog={latestBlog} />
                        <BlogList blogs={recentBlogs} />

                    </div>
                    <OtherBlogList allBlogs={allBlogs} />
                </div>
                <Footer />
            </main>
        );
    }
}




export default BlogsPage;
