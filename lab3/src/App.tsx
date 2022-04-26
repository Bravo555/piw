import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom';
import './App.css';
import Search from './pages/Search';
import Add from './pages/Add';
import Groups from './pages/Groups';
import Student from './types/Student';
import Group from './types/Group';
import GroupAdd from './pages/GroupAdd';


// TODO: remove duplicated state
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
    },
    { name: 'Marcel', email: 'marcel@mguzik.eu', description: '' },
    { name: 'Miłosz', email: 'mimsowy@wp.pl', description: '' },
    { name: 'Maciej', email: 'byczax@byczko.pl', description: '' },
    { name: 'Bartosz', email: 'qucker@gmail.com', description: '' },
  ]);

  const subjects = [
    { shortname: 'PIW', longname: 'Programowanie interfejsów webowych' },
    { shortname: 'SO2', longname: 'Systemy operacyjne 2' },
    { shortname: 'PIPG', longname: 'Projektowanie i programowanie gier' },
    { shortname: 'RiPO', longname: 'Rozpoznawanie i przetwarzanie obrazów' },
    { shortname: 'PZ', longname: 'Projekt zespołowy' }
  ];

  const [groups, setGroups] = useState([
    {
      name: 'Rozpoznawanie sygnalizacji świetlnej',
      subject: 'Rozpoznawanie i przetwarzanie obrazów',
      size: 2,
      members: [
        { name: 'Marcel', email: 'marcel@mguzik.eu', description: '' },
        { name: 'Miłosz', email: 'mimsowy@wp.pl', description: '' }
      ]
    },
    {
      name: 'PACAN',
      subject: 'Projekt grupowy',
      size: 4,
      members: [
        { name: 'Marcel', email: 'marcel@mguzik.eu', description: '' },
        { name: 'Miłosz', email: 'mimsowy@wp.pl', description: '' },
        { name: 'Maciej', email: 'byczax@byczko.pl', description: '' },
        { name: 'Bartosz', email: 'qucker@gmail.com', description: '' },
      ]
    },
    {
      name: 'Monada to po prostu monoid w kategorii endofunktorów',
      subject: 'Teoria kategorii dla programistów',
      size: 6,
      members: [
        { name: 'Marcel', email: 'marcel@mguzik.eu', description: '' }
      ]
    }
  ]);

  return (
    <div className='App'>
      <h1>Student (debil)</h1>

      <Router basename='piw/lab3'>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/groups">Groups</Link>
          <Link to="/add">Dodaj debila</Link>
          <Link to="/groups/add">Dodaj grupę debili</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Search students={students} />} />
          <Route path="/groups" element={<Groups groups={groups} />} />
          <Route path="/add" element={
            <Add addStudent={(student: Student) => {
              setStudents([...students, student]);
            }} />
          } />
          <Route path="/groups/add" element={
            <GroupAdd students={students} addGroup={(group: Group) => {
              setGroups([...groups, group]);
            }} />
          } />
        </Routes>
      </Router>

    </div>
  );
};

export default App;
