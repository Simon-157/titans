import React, { Component } from 'react';
import styles from '../css/styles.css';

class CafeDetails extends Component {
  state = {
    cafe: null,
    events: [],
    leaderboard: []
  };

  componentDidMount() {
    // Simulate data fetching
    this.fetchData();
  }

  fetchData() {
    const cafeData = {
      name: 'Reign of Titans Café',
      location: 'Mumbai, India',
      rating: 5.0,
      description: 'The Asgard was designed in Ireland and local artists put the finishing touches...',
      capacity: 80,
      contact: {
        phone: '+420 608 464 497',
        website: 'https://www.asgard-bar.com/',
        address: '60 Fetter Ln, Holborn, Prague, ECAA 1JP, Czech Republic'
      },
      hours: {
        mon: '6:00 PM - 11:30 PM',
        tue: '6:00 PM - 11:30 PM',
        wed: '6:00 PM - 11:30 PM',
        thu: '6:00 PM - 11:30 PM',
        fri: '6:00 PM - 11:30 PM',
        sat: '2:00 PM - 11:30 PM',
        sun: '12:00 PM - 10:30 PM'
      },
      image: 'path/to/image.jpg'
    };

    const eventsData = [
      { id: 1, name: 'Meetup', location: 'Jaipur', date: 'Aug 28th, 2023', time: '17:00-22:00', description: 'Lorem ipsum dolor sit amet' },
      { id: 2, name: 'Another Event', location: 'Lucknow', date: 'Aug 28th, 2023', time: '17:00-22:00', description: 'Lorem ipsum dolor sit amet' }
    ];

    const leaderboardData = [
      { rank: 1, player: 'Xcyriz', points: 449003 },
      { rank: 2, player: 'Azuthius', points: 449003 },
      { rank: 3, player: 'crazyelephant681', points: 267400 },
      // ... more data
    ];

    this.setState({
      cafe: cafeData,
      events: eventsData,
      leaderboard: leaderboardData
    });
  }

  render() {
    const { cafe, events, leaderboard } = this.state;

    if (!cafe) {
      return <div>Loading...</div>;
    }

    return (
      <div className={styles.cafeDetails}>
        <div className={styles.header}>
          <button className={styles.backButton}>Back</button>
          <nav>
            <ul>
              <li>Play</li>
              <li>Discover</li>
              <li>Blog</li>
              <li>Events</li>
              <li>Cafés</li>
            </ul>
          </nav>
        </div>
        <div className={styles.cafeInfo}>
          <div className={styles.cafeImage}>
            <img src={cafe.image} alt={cafe.name} />
          </div>
          <div className={styles.cafeDetailsText}>
            <h1>{cafe.name}</h1>
            <p>{cafe.description}</p>
            <div className={styles.cafeMeta}>
              <p>Location: {cafe.location}</p>
              <p>Rating: {cafe.rating} ★</p>
              <p>Capacity: {cafe.capacity}</p>
              <p>Contact: {cafe.contact.phone}, <a href={cafe.contact.website}>Website</a></p>
              <p>Address: {cafe.contact.address}</p>
              <p>Hours: 
                {Object.entries(cafe.hours).map(([day, hours]) => (
                  <span key={day}>{day.toUpperCase()}: {hours}</span>
                ))}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.cafeEvents}>
          <h2>Café Events</h2>
          <div className={styles.eventsList}>
            {events.map(event => (
              <div key={event.id} className={styles.eventCard}>
                <h3>{event.name}</h3>
                <p>{event.location}</p>
                <p>{event.date} - {event.time}</p>
                <p>{event.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.leaderboard}>
          <h2>Leaderboard</h2>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map(entry => (
                <tr key={entry.rank}>
                  <td>{entry.rank}</td>
                  <td>{entry.player}</td>
                  <td>{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default CafeDetails;
