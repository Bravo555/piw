import { useState } from 'react';
import { Route, Routes, Link, HashRouter } from 'react-router-dom';
import './App.css';
import Students from './pages/Students';
import StudentAdd from './pages/StudentAdd';
import Groups from './pages/Groups';
import Student from './types/Student';
import Group from './types/Group';
import GroupAdd from './pages/GroupAdd';
import SendMessage from './pages/SendMessage';


// TODO: remove duplicated state
const App = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Marek', email: 'xXx_MaReK_xXx@pudelek.pl', description: 'Doin your mom, doin doin your mom!' },
    {
      id: 2,
      name: 'Basia', email: 'barbara@gmail.com', description: 'Interested in functional programming and type systems.',
      tags: ['functional programming', 'type systems', 'programming language research']
    },
    {
      id: 3,
      name: 'X Æ A-Xii', email: 'techpriest@mechanicus.terra', description: 'Even in death I serve the Omnissiah.',
      tags: ['omnissiah', 'adeptus mechanicus', 'the flesh is weak']
    },
    { id: 4, name: 'Marcel', email: 'marcel@mguzik.eu', description: '' },
    { id: 5, name: 'Miłosz', email: 'mimsowy@wp.pl', description: '' },
    { id: 6, name: 'Maciej', email: 'byczax@byczko.pl', description: '' },
    { id: 7, name: 'Bartosz', email: 'qucker@gmail.com', description: '' },
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
      id: 1,
      name: 'Rozpoznawanie sygnalizacji świetlnej',
      subject: 'Rozpoznawanie i przetwarzanie obrazów',
      size: 2,
      members: [
        { id: 4, name: 'Marcel', email: 'marcel@mguzik.eu', description: '' },
        { id: 5, name: 'Miłosz', email: 'mimsowy@wp.pl', description: '' }
      ]
    },
    {
      id: 2,
      name: 'PACAN',
      subject: 'Projekt grupowy',
      size: 4,
      members: [
        { id: 4, name: 'Marcel', email: 'marcel@mguzik.eu', description: '' },
        { id: 5, name: 'Miłosz', email: 'mimsowy@wp.pl', description: '' },
        { id: 6, name: 'Maciej', email: 'byczax@byczko.pl', description: '' },
        { id: 7, name: 'Bartosz', email: 'qucker@gmail.com', description: '' },
      ]
    },
    {
      id: 3,
      name: 'Monada to po prostu monoid w kategorii endofunktorów',
      subject: 'Teoria kategorii dla programistów',
      size: 6,
      members: [
        { id: 1, name: 'Marcel', email: 'marcel@mguzik.eu', description: '' }
      ]
    }
  ]);

  const [nextStudentId, setNextStudentId] = useState(students.length);
  const [nextGroupId, setNextGroupId] = useState(groups.length);

  const getRecepient = (type: string, id: string) => {
    if (type === 'group') {
      return groups.find((group) => group.id === parseInt(id)) || null;
    }
    if (type === 'student') {
      return students.find((student) => student.id === parseInt(id)) || null;
    }
    return null;
  }

  return (
    <div className='App'>
      <h1>Student (debil)</h1>

      <HashRouter>
        <nav>
          <Link to="/">Studenci</Link>
          <Link to="/groups">Grupy</Link>
          <Link to="/add">Dodaj studenta</Link>
          <Link to="/groups/add">Dodaj grupę</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Students students={students} />} />
          <Route path="/groups" element={<Groups groups={groups} />} />
          <Route path="/add" element={
            <StudentAdd addStudent={(student) => {
              setStudents([...students, { id: nextStudentId, ...student }]);
              setNextStudentId(nextGroupId + 1);
            }} />
          } />
          <Route path="/groups/add" element={
            <GroupAdd students={students} addGroup={(group) => {
              setGroups([...groups, { id: nextGroupId, ...group }]);
              setNextGroupId(nextGroupId + 1);
            }} />
          } />
          <Route path="/sendmessage/:recepientType/:recepientName" element={<SendMessage getRecepient={getRecepient} />} />
        </Routes>
      </HashRouter>

    </div>
  );
};

export default App;
