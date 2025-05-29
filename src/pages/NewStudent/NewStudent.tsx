import { Component, type ChangeEvent, type FormEvent } from 'react';

import { withRouter } from '../../hoc/withRouter';
import supabaseService from '../../services/supabase';

import './NewStudent.css';

interface NewStudentProps {
  navigate: (path: string) => void;
}

interface NewStudentState {
  cyberwars: string | undefined;
  faculty: string;
  first_name: string;
  game_theory?: string;
  group: string;
  last_name: string;
  management?: string;
  oop?: string;
  specialty: string;
  error?: string;
}

class NewStudent extends Component<NewStudentProps, NewStudentState> {
  state = {
    first_name: '',
    last_name: '',
    group: '',
    faculty: '',
    specialty: '',
    management: '',
    oop: '',
    cyberwars: '',
    game_theory: '',
    error: '',
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.name]: e.target.value || '',
    } as unknown as NewStudentState);
  };

  validateFields = () => {
    const {
      first_name,
      last_name,
      group,
      faculty,
      specialty,
      management,
      oop,
      cyberwars,
      game_theory,
    } = this.state;

    if (!first_name || !last_name || !group || !faculty || !specialty) {
      this.setState({ error: 'Please fill in all required fields.' });
      return false;
    }

    const scores = [
      { label: 'Management', value: management },
      { label: 'OOP', value: oop },
      { label: 'Cyberwars', value: cyberwars },
      { label: 'Game Theory', value: game_theory },
    ];

    for (const score of scores) {
      if (score.value !== '') {
        const num = parseFloat(score.value);
        if (isNaN(num) || num < 0 || num > 100) {
          this.setState({
            error: `${score.label} must be a number between 0 and 100.`,
          });
          return false;
        }
      }
    }

    this.setState({ error: '' });
    return true;
  };

  handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!this.validateFields()) return;

    const {
      first_name,
      last_name,
      group,
      faculty,
      specialty,
      management,
      oop,
      cyberwars,
      game_theory,
    } = this.state;

    try {
      await supabaseService.createStudent({
        first_name,
        last_name,
        group_name: group,
        faculty,
        specialty,
        management: parseFloat(management) || null,
        oop: parseFloat(oop) || null,
        cyberwars: parseFloat(cyberwars) || null,
        game_theory: parseFloat(game_theory) || null,
      });

      this.props.navigate('/students');
    } catch (error) {
      alert('Error creating student');
      console.error('Error creating student:', error);
    }
  };

  render() {
    return (
      <section className="new-student">
        <h1>Create New Student</h1>

        <form onSubmit={this.handleSubmit}>
          {this.state.error && <div className="error">{this.state.error}</div>}

          <label htmlFor="first_name">First Name*</label>
          <input
            id="first_name"
            name="first_name"
            value={this.state.first_name}
            onChange={this.handleChange}
            required
          />

          <label htmlFor="last_name">Last Name*</label>
          <input
            id="last_name"
            name="last_name"
            value={this.state.last_name}
            onChange={this.handleChange}
            required
          />

          <label htmlFor="group">Group*</label>
          <input
            id="group"
            name="group"
            value={this.state.group}
            onChange={this.handleChange}
            required
          />

          <label htmlFor="faculty">Faculty*</label>
          <input
            id="faculty"
            name="faculty"
            value={this.state.faculty}
            onChange={this.handleChange}
            required
          />

          <label htmlFor="specialty">Specialty*</label>
          <input
            id="specialty"
            name="specialty"
            value={this.state.specialty}
            onChange={this.handleChange}
            required
          />

          <label htmlFor="management">Management (optional)</label>
          <input
            id="management"
            name="management"
            value={this.state.management}
            onChange={this.handleChange}
          />

          <label htmlFor="oop">OOP (optional)</label>
          <input
            id="oop"
            name="oop"
            value={this.state.oop}
            onChange={this.handleChange}
          />

          <label htmlFor="cyberwars">Cyberwars (optional)</label>
          <input
            id="cyberwars"
            name="cyberwars"
            value={this.state.cyberwars}
            onChange={this.handleChange}
          />

          <label htmlFor="game_theory">Game Theory (optional)</label>
          <input
            id="game_theory"
            name="game_theory"
            value={this.state.game_theory}
            onChange={this.handleChange}
          />

          <button type="submit">Create</button>
        </form>
      </section>
    );
  }
}

export default withRouter(NewStudent);
