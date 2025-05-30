import { Component, type ChangeEvent, type FormEvent } from 'react';

import { withRouter } from '../../hoc/withRouter';

import supabaseService from '../../services/supabase';

import './NewStudent.css';

interface NewStudentProps {
  navigate: (path: string) => void;
  params: { id?: string };
}

interface NewStudentState {
  cyberwars?: string;
  faculty: string;
  first_name: string;
  game_theory?: string;
  group: string;
  last_name: string;
  management?: string;
  oop?: string;
  specialty: string;
  error: string;
  isEditMode: boolean;
  studentId: string | null;
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
    isEditMode: false,
    studentId: null,
  };

  async componentDidMount() {
    const id = this.props.params.id;

    try {
      if (id) {
        const student = await supabaseService.getStudentById(+id);

        this.setState({
          first_name: student.first_name || '',
          last_name: student.last_name || '',
          group: student.group_name || '',
          faculty: student.faculty || '',
          specialty: student.specialty || '',
          management: student.management?.toString() ?? '',
          oop: student.oop?.toString() ?? '',
          cyberwars: student.cyberwars?.toString() ?? '',
          game_theory: student.game_theory?.toString() ?? '',
          isEditMode: true,
          studentId: id,
          error: '',
        });
      }
    } catch (error) {
      this.setState({ error: 'Error fetching student data.' });
    }
  }

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
      studentId,
      isEditMode,
    } = this.state;

    const studentData = {
      first_name,
      last_name,
      group_name: group,
      faculty,
      specialty,
      management: parseFloat(management) || null,
      oop: parseFloat(oop) || null,
      cyberwars: parseFloat(cyberwars) || null,
      game_theory: parseFloat(game_theory) || null,
    };

    try {
      if (isEditMode && studentId) {
        await supabaseService.updateStudent(studentId, studentData);
      } else {
        await supabaseService.createStudent(studentData);
      }

      this.props.navigate('/students');
    } catch (error) {
      alert('Error creating/updating student');
      console.error('Error creating student:', error);
    }
  };
  render() {
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
      error,
      isEditMode,
    } = this.state;

    return (
      <section className="new-student">
        <h1>{isEditMode ? 'Edit Student' : 'Add New Student'}</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={this.handleSubmit} className="student-form">
          <label>First Name</label>
          <input
            name="first_name"
            value={first_name}
            onChange={this.handleChange}
            required
          />

          <label>Last Name</label>
          <input
            name="last_name"
            value={last_name}
            onChange={this.handleChange}
            required
          />

          <label>Group</label>
          <input
            name="group"
            value={group}
            onChange={this.handleChange}
            required
          />

          <label>Faculty</label>
          <input
            name="faculty"
            value={faculty}
            onChange={this.handleChange}
            required
          />

          <label>Specialty</label>
          <input
            name="specialty"
            value={specialty}
            onChange={this.handleChange}
            required
          />

          <label>Management</label>
          <input
            name="management"
            value={management}
            onChange={this.handleChange}
            placeholder="0-100 or leave empty"
          />

          <label>OOP</label>
          <input
            name="oop"
            value={oop}
            onChange={this.handleChange}
            placeholder="0-100 or leave empty"
          />

          <label>Cyberwars</label>
          <input
            name="cyberwars"
            value={cyberwars}
            onChange={this.handleChange}
            placeholder="0-100 or leave empty"
          />

          <label>Game Theory</label>
          <input
            name="game_theory"
            value={game_theory}
            onChange={this.handleChange}
            placeholder="0-100 or leave empty"
          />

          <div className="button-group">
            <button type="submit">
              {isEditMode ? 'Update Student' : 'Create Student'}
            </button>

            <button
              type="button"
              onClick={() => this.props.navigate('/students')}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default withRouter(NewStudent);
