import { Component } from 'react';

import { Link } from 'react-router';

import './Home.css';

class Home extends Component {
  render() {
    return (
      <main className="home">
        <h1>
          Розроблення програмної системи зведеного аналізу успішності за
          дисциплінами
        </h1>
        <p>Казіміров Григорій, ІА-201</p>

        <Link to="/students" className="link-button">
          Успішність студентів
        </Link>
      </main>
    );
  }
}

export default Home;
