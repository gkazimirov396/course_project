import { Component, type ChangeEvent, type FormEvent } from 'react';

import { Link } from 'react-router';

import supabaseService from '../../services/supabase';

import { withRouter } from '../../hoc/withRouter';

import './Login.css';

interface LoginProps {
  navigate: (path: string) => void;
}

interface LoginState {
  email: string;
  password: string;
}

class Login extends Component<LoginProps, LoginState> {
  state = {
    email: '',
    password: '',
  };

  handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password } = this.state;

    if (!email || !email.includes('@') || !password || password.length < 6) {
      alert('Please enter a valid email and password.');
      return;
    }

    try {
      const result = await supabaseService.signIn(email, password);

      console.log('Login successful:', result);
      this.props.navigate('/home');
      alert('Login successful! Redirecting...');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  render() {
    return (
      <div>
        <h1>Login Page</h1>

        <form className="login-form" onSubmit={this.handleSubmit}>
          <input
            type="email"
            required
            placeholder="test@gmail.com"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />

          <input
            type="password"
            required
            placeholder="******"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />

          <p>
            Don't have an account yet?{' '}
            <Link to="/register">Create an account</Link>
          </p>

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
