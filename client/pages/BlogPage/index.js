import React, { Component } from "react";
import { blogsData } from "./dummyData";
import styles from "./css/styles.css";
import { withRouter } from "react-router-dom";
import { timeAgo } from "../utils";
import Navbar from "../EventsPage/NavBar";
import { events } from "../EventsPage/data";
import RegionFilter from "../CafesPage/components/RegionFilter";
import RelatedEvents from "../EventPage/RelatedEvents";
import Footer from "../EventsPage/Footer";

class BlogDetail extends Component {
  // TODO: Based on the blogId in the url, make a query to the server to get the blog data using the blogId instead of using the dummy data from ./data
  constructor(props) {
    super(props);
    const blogId = this.props.match.params.blogId;
    console.log(blogId);
    const blog = blogsData.find((b) => b.id === parseInt(blogId));
    console.log(blog);
    this.state = {
      blog:blog,
      region: "see all regions",
      visibleEvents: 4,
    };
  }

  handleRegionChange = (region) => {
    this.setState({ region });
  };

  loadMoreEvents = () => {
    this.setState((prevState) => ({
      visibleEvents: prevState.visibleEvents + 4,
    }));
  };

  render() {
    const { blog } = this.state;
    if (!blog) return <div className={styles.blogDetail}>Blog not found.</div>;

    const sanitizeHtml = (html) => {
      // TODO: Sanitize the html string to prevent XSS attacks
      return { __html: html };
    };

    const { region, visibleEvents } = this.state;

    const filteredEvents = events.filter((event) => {
      const matchesRegion =
        region === "see all regions" || event.region === region;
      return matchesRegion;
    });

    return (
      <main className={styles.blogPageWrapper}>
        <div className={styles.blogDetail}>
          <Navbar />
          <section className={styles.content}>
            <header className={styles.header}>
              <h1>{blog.title}</h1>
            </header>
            <img
              src={blog.image}
              alt={blog.title}
              className={styles.mainImage}
            />
            <div className={styles.description}>
              <section className={styles.authorInfo}>
                <p>
                  <span>{timeAgo(blog.date)} </span>By {blog.author} |{" "}
                  {blog.readTime} min read
                </p>
              </section>
              <div
                className="blog-description"
                dangerouslySetInnerHTML={sanitizeHtml(blog.description)}
              />
            </div>
          </section>
        </div>
          <div className={styles.allCafes}>
            <section className={styles.searchSection}>
              <header className={styles.header}>
                <img src="/img/box-icon.png" alt="box icon" />
                <h1> Events Around You</h1>
              </header>
              <RegionFilter
                currentRegion={region}
                onRegionChange={this.handleRegionChange}
              />
            </section>
            <div className={styles.eventsAround}>
              <RelatedEvents
                events={filteredEvents}
                visibleEvents={visibleEvents}
                loadMoreEvents={this.loadMoreEvents}
              />
            </div>
          </div>
        <Footer />
      </main>
    );
  }
}

export default withRouter(BlogDetail);
