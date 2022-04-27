import { useState } from 'react';
import Student from '../types/Student';
import StudentCard from '../components/StudentCard';

const Students = ({ students }: { students: Student[] }) => {
  const [name, setName] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [description, setDescription] = useState('');

  return (
    <>
      <h2>Search:</h2>

      <div className="form">
        <div>
          <label htmlFor="name">Name: </label>
          <input type="text" id="name" onChange={(e) => setName(e.target.value.toLowerCase())} />
        </div>

        <div>
          <label htmlFor="tags">Tags: </label>
          <input type="text" id="tags" onChange={(e) => {
            const tags = e.target.value.trim().split(',').map((tag) => tag.trim());
            if (tags[tags.length - 1].trim() === '') tags.pop();
            setTags(tags);
          }} />
        </div>

        <div>
          <label htmlFor="subjects">Subjects: </label>
          <input type="text" id="subjects" onChange={(e) => {
            const subjects = e.target.value.trim().split(',').map((subject) => subject.trim());
            if (subjects[tags.length - 1].trim() === '') tags.pop();
            setSubjects(tags);
          }} />
        </div>

        <div>
          <label htmlFor="description">Description: </label>
          <textarea id="description" onChange={(e) => setDescription(e.target.value.toLowerCase())}></textarea>
        </div>
      </div>

      <h2>Studenci:</h2>
      <div className="wrapper">
        <ul className='flex-list'>
          {students
            .filter((student) =>
              student.name.toLowerCase().includes(name)
              && tags.every((tag) => student.tags?.find(studentTag => studentTag.startsWith(tag)))
              && !subjects.find((subject) => !student.subjects?.includes(subject))
              && student.description.includes(description)
            ).map((student, i) => <li key={i}><StudentCard student={student} /></li>)}
        </ul>
      </div>
    </>
  );
};

export default Students;
