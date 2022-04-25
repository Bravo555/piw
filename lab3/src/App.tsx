import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom';
import './App.css';
import Search from './Search';
import Add from './pages/Add';
import Student from './types/Student';
import Groups from './pages/Groups';
import Group from './types/Group';


const App = () => {
  const [students, setStudents] = useState([
    { name: 'Marek', email: 'xXx_MaReK_xXx@pudelek.pl', description: 'Doin your mom, doin doin your mom!' },
    {
      name: 'Basia', email: 'barbara@gmail.com', description: 'Interested in functional programming and type systems.',
      tags: ['functional programming', 'type systems', 'programming language research']
    },
    {
      name: 'X Æ A-Xii', email: 'techpriest@mechanicus.terra', description: 'Even in death I serve the Omnissiah.',
      tags: ['omnissiah', 'adeptus mechanicus', 'the flesh is weak']
    }
  ]);

  const subjects = [
    'Programowanie interfejsów webowych',
    'Systemy operacyjne',
    'Projektowanie i programowanie gier',
    'Rozpoznawanie i przetwarzanie obrazów',
    'Projekt grupowy'
  ];

  const groups: Group[] = [
    {
      size: 2,
      subject: 'Rozpoznawanie i przetwarzanie obrazów',
      members: [
        { name: 'Marcel', email: 'marcel@mguzik.eu', description: '' },
        { name: 'Miłosz', email: 'mimsowy@wp.pl', description: '' }
      ]
    },
    {
      size: 4,
      subject: 'Projekt grupowy',
      members: [
        { name: 'Marcel', email: 'marcel@mguzik.eu', description: '' },
        { name: 'Miłosz', email: 'mimsowy@wp.pl', description: '' },
        { name: 'Maciej', email: 'byczax@gmail.com', description: '' },
        { name: 'Bartosz', email: 'qucker@gmail.com', description: '' },
      ]
    },
    {
      size: 6,
      subject: 'Monad lecture',
      members: [
        { name: 'Marcel', email: 'marcel@mguzik.eu', description: '' }
      ]
    }
  ];

  return (
    <div className='App'>
      <h1>Student (debil)</h1>

      <Router basename='piw/lab3'>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/groups">Groups</Link>
          <Link to="/add">Dodaj debila</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Search students={students} />} />
          <Route path="/groups" element={<Groups groups={groups} />} />
          <Route path="/add" element={
            <Add addStudent={(student: Student) => {
              setStudents([student, ...students]);
            }} />
          } />
        </Routes>
      </Router>

    </div>
  );
};

export default App;
