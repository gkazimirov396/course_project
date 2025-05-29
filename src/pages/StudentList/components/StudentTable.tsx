import { Component } from 'react';

import type { Student } from '../../../types/supabase';

interface StudentTableProps {
  students: Student[];
  sortOrder: 'asc' | 'desc';
  onSort: () => void;
  onDelete: (id: number) => void;
  calculateAverage: (student: Student) => number;
}

class StudentTable extends Component<StudentTableProps> {
  private renderGrade = (grade: number | null) => {
    return grade !== null ? grade : 'N/a';
  };

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Group</th>
            <th>Faculty</th>
            <th>Specialty</th>
            <th>OOP</th>
            <th>Cyberwars</th>
            <th>Game Theory</th>
            <th>Management</th>
            <th onClick={this.props.onSort} style={{ cursor: 'pointer' }}>
              Avg Grade {this.props.sortOrder === 'asc' ? '↑' : '↓'}
            </th>
          </tr>
        </thead>

        <tbody>
          {this.props.students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>
                {student.first_name} {student.last_name}
              </td>
              <td>{student.group_name}</td>
              <td>{student.faculty}</td>
              <td>{student.specialty}</td>
              <td>{this.renderGrade(student.oop)}</td>
              <td>{this.renderGrade(student.cyberwars)}</td>
              <td>{this.renderGrade(student.game_theory)}</td>
              <td>{this.renderGrade(student.management)}</td>
              <td>{this.props.calculateAverage(student)}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => this.props.onDelete(student.id)}
                >
                  &times;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default StudentTable;
