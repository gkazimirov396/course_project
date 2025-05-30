import { Component } from 'react';

import { Link } from 'react-router';

import { withRouter } from '../../hoc/withRouter';

import supabaseService from './../../services/supabase';

import './Home.css';

interface HomeProps {
  navigate: (path: string) => void;
}

class Home extends Component<HomeProps> {
  handleLogout = async () => {
    try {
      await supabaseService.signOut();

      this.props.navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  render() {
    return (
      <main className="home">
        <h1>
          Розроблення програмної системи рейтингового аналізу успішності
          студентів за дисциплінами
        </h1>

        <p>Казіміров Григорій, ІА-201</p>

        <div className="home-buttons">
          <Link to="/students" className="link-button">
            Успішність студентів
          </Link>

          <button onClick={this.handleLogout} className="logout-button">
            Вийти
          </button>
        </div>
      </main>
    );
  }
}

export default withRouter(Home);
