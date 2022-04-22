import { useState } from 'react';
import './App.css';
import Search from './Search';
import Add from './pages/Add';
import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom';


const App = () => {
  const [students, setStudents] = useState([
    { name: 'Marek', description: 'Doin your mom, doin doin your mom!' },
    {
      name: 'Basia', description: 'Interested in functional programming and type systems.',
      tags: ['functional programming', 'type systems', 'programming language research']
    },
    {
      name: 'X Æ A-Xii', description: 'Even in death I serve the Omnissiah.',
      tags: ['omnissiah', 'adeptus mechanicus', 'the flesh is weak']
    }
  ]);

  return (
    <div className='App'>
      <h1>Student (debil)</h1>

      Władimir Putin jest zbrodniarzem wojennym

    </div>
  );
}

export default App;
