import React, { useEffect, useState } from 'react';
import { Route, Routes, Link, HashRouter } from 'react-router-dom';
import './App.css';
import Students from './pages/Students';
import StudentAdd from './pages/StudentAdd';
import Groups from './pages/Groups';
import Student from './types/Student';
import Group from './types/Group';
import GroupAdd from './pages/GroupAdd';
import SendMessage from './pages/SendMessage';
import StudentDetails from './pages/StudentDetails';
import Header from './components/Header';
import User from './types/User';
import UserContext from './contexts/UserContext';



// TODO: remove duplicated state
const App = () => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string) => {
    const user = { email };
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  }

  // check if user in localstorage
  useEffect(() => {
    const userItem = localStorage.getItem('user');
    if (userItem) {
      const localUser = JSON.parse(userItem);
      if (localUser)
        login(localUser.email);
    }
  }, [])

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

  const getStudent = (studentId: string) => students.find(s => s.id === parseInt(studentId)) || null;

  const addStudent = (student: Omit<Student, 'id'>) => {
    setStudents([...students, { id: nextStudentId, ...student }]);
    setNextStudentId(nextGroupId + 1);
  }

  const addGroup = (group: Omit<Group, 'id'>) => {
    setGroups([...groups, { id: nextGroupId, ...group }]);
    setNextGroupId(nextGroupId + 1);
  }

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    (async () => {
      const response = await fetch('/piw/lab3/api/state.json');
      const { students, groups } = await response.json();

      setStudents(students);
      setGroups(groups);

      let images = await fetch(`https://picsum.photos/v2/list?page=${getRandomInt(33)}&limit=${students.length}`);
      let images2 = await images.json();

      const studentsWithImg = students.map((student: any, i: any) => (
        {
          ...student,
          imageUrl: `https://picsum.photos/id/${images2[i]['id']}/400`,
          thumbUrl: `https://picsum.photos/id/${images2[i]['id']}/150`,
        }
      ));

      setStudents(studentsWithImg);
    })();
  }, []);

  return (
    <UserContext.Provider value={[user, login, logout]}>
      <div className='App'>
        <HashRouter>
          <Header />

          <Routes>
            <Route path="/">
              <Route index element={<Students students={students} />} />
              <Route path="students">
                <Route index element={<Students students={students} />} />
                <Route path="add" element={<StudentAdd addStudent={addStudent} />} />
                <Route path=":studentId" element={<StudentDetails getStudent={getStudent} />} />
              </Route>
              <Route path="groups">
                <Route index element={<Groups groups={groups} />} />
                <Route path="add" element={<GroupAdd students={students} addGroup={addGroup} />} />
              </Route>
              <Route path="sendmessage/:recepientType/:recepientName" element={<SendMessage getRecepient={getRecepient} />} />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    </UserContext.Provider>
  );
};

export default App;
