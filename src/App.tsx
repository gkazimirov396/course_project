import { Component } from 'react';

import { Route, Routes } from 'react-router';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NewStudent from './pages/NewStudent/NewStudent';
import StudentList from './pages/StudentList/StudentList';

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/home" element={<Home />} />

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/students" element={<StudentList />} />
        <Route path="/students/new" element={<NewStudent />} />

        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    );
  }
}

export default App;
