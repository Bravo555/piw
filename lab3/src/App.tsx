import { useEffect, useState } from 'react';
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
  const [students, setStudents] = useState<Student[]>([]);

  const subjects = [
    { shortname: 'PIW', longname: 'Programowanie interfejsów webowych' },
    { shortname: 'SO2', longname: 'Systemy operacyjne 2' },
    { shortname: 'PIPG', longname: 'Projektowanie i programowanie gier' },
    { shortname: 'RiPO', longname: 'Rozpoznawanie i przetwarzanie obrazów' },
    { shortname: 'PZ', longname: 'Projekt zespołowy' }
  ];

  const [groups, setGroups] = useState<Group[]>([]);

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

  useEffect(() => {
    fetch('api/state.json')
      .then(response => response.json())
      .then(response => {
        setStudents(response.students);
        setGroups(response.groups)
      });
  }, []);

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
