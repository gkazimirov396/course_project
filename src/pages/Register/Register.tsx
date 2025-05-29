import { Component, type FormEvent } from 'react';

import { Link } from 'react-router';

import { withRouter } from '../../hoc/withRouter';

import supabaseService from './../../services/supabase';

import './Register.css';

interface RegisterProps {
  navigate: (path: string) => void;
}

interface RegisterState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

class Register extends Component<RegisterProps, RegisterState> {
  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  handleUsernameChange = (e: FormEvent<HTMLInputElement>) => {
    this.setState({ username: (e.target as HTMLInputElement).value });
  };

  handleEmailChange = (e: FormEvent<HTMLInputElement>) => {
    this.setState({ email: (e.target as HTMLInputElement).value });
  };

  handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
    this.setState({ password: (e.target as HTMLInputElement).value });
  };

  handleConfirmPasswordChange = (e: FormEvent<HTMLInputElement>) => {
    this.setState({ confirmPassword: (e.target as HTMLInputElement).value });
  };

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const { user } = await supabaseService.signUp(email, password, username);

      console.log('Registered user:', user);
      alert(
        'Registration successful! Now you can log in with your credentials.'
      );

      this.props.navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  render() {
    return (
      <div>
        <h1>Register Page</h1>

        <form className="register-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleUsernameChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={this.state.confirmPassword}
            onChange={this.handleConfirmPasswordChange}
          />
          <p>
            Already have an account? <Link to="/">Login here</Link>
          </p>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Register);
