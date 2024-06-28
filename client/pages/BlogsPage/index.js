import React, { Component } from 'react';
import MainBlogCard from './components/MainBlogCard';
import styles from './css/styles.css';
import Navbar from '../EventsPage/components/NavBar';
import OtherBlogList from './components/OtherBlogs';
import Footer from '../EventsPage/components/Footer';
import SearchBox from '../EventsPage/components/SearchBox';
import { blogsData } from './dummyData';
import { blogData } from './data';
import BlogList from './components/BlogList';

class BlogsPage extends Component {
    // TODO:Oncomponent mount; FETCH the most recent blog posts from the server as the latestBlog, 4 recentBlogs, and allBlogs state from the api endpoints
    state = {
        latestBlog: blogData[0],
        recentBlogs: blogsData.slice(1, 5),
        allBlogs: blogsData
    };

    render() {
        const { latestBlog, recentBlogs, allBlogs } = this.state;

        return (
            <main className={styles.app}>
                <Navbar /><div className={styles.blogspageWrapper}>
                    <div style={{margin:"40px 0px"}}>
                        <SearchBox />
                    </div>
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
