import { Component, type ChangeEvent } from 'react';

import { Link } from 'react-router';

import supabaseService from '../../services/supabase';

import StudentTable from './components/StudentTable';

import type { Student } from '../../types/supabase';

import './StudentList.css';

interface StudentListState {
  students: Student[];
  filteredStudents: Student[];
  sortOrder: 'asc' | 'desc';
  selectedSubject: string;
}

class StudentList extends Component<{}, StudentListState> {
  state: StudentListState = {
    students: [],
    filteredStudents: [],
    sortOrder: 'asc',
    selectedSubject: 'all',
  };

  async componentDidMount() {
    const students = await supabaseService.getStudents();

    this.setState({ students, filteredStudents: students });
  }

  calculateAverage = (student: Student) => {
    const subjects = ['oop', 'cyberwars', 'game_theory', 'management'] as const;
    const grades = subjects
      .map(subject => student[subject])
      .filter(grade => grade !== null);

    const total = grades.reduce((sum, grade) => sum + grade, 0);

    return Number((total / grades.length).toFixed(2));
  };

  handleSort = () => {
    const { filteredStudents, sortOrder } = this.state;

    const sorted = [...filteredStudents].sort((a, b) => {
      const avgA = this.calculateAverage(a);
      const avgB = this.calculateAverage(b);

      return sortOrder === 'asc' ? avgA - avgB : avgB - avgA;
    });

    this.setState({
      filteredStudents: sorted,
      sortOrder: sortOrder === 'asc' ? 'desc' : 'asc',
    });
  };

  handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSubject = e.target.value;
    const { students } = this.state;

    if (selectedSubject === 'all') {
      this.setState({ filteredStudents: students, selectedSubject });
    } else {
      const filtered = students.filter(
        s => (s[selectedSubject as keyof Student] as number) > 0
      );

      this.setState({ filteredStudents: filtered, selectedSubject });
    }
  };

  handleDelete = async (id: number) => {
    await supabaseService.deleteStudent(id);

    const students = this.state.students.filter(s => s.id !== id);
    this.setState({ students, filteredStudents: students });
  };

  render() {
    const { filteredStudents, sortOrder, selectedSubject } = this.state;

    return (
      <section className="student-list">
        <h1>Students Performance Table</h1>

        <div className="toolbar">
          <label>
            Фільтр за дисципліною:
            <select value={selectedSubject} onChange={this.handleFilter}>
              <option value="all">All</option>
              <option value="oop">OOP</option>
              <option value="cyberwars">Cyberwars</option>
              <option value="game_theory">Game Theory</option>
              <option value="management">Management</option>
            </select>
          </label>

          <Link to="/students/new" className="add-student-link">
            ➕ Додати студента
          </Link>

          <Link to="/home">
            <button className="back-button">🏠 На головне меню</button>
          </Link>
        </div>

        <StudentTable
          sortOrder={sortOrder}
          students={filteredStudents}
          onSort={this.handleSort}
          onDelete={this.handleDelete}
          calculateAverage={this.calculateAverage}
        />
      </section>
    );
  }
}

export default StudentList;
