import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Student from '../types/Student';

const Add = ({ addStudent }: { addStudent: (s: Student) => void }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  return (
    <div className="form">
      <h2>Dodaj debila:</h2>
      <div>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <label htmlFor="email">Email: </label>
        <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div>
        <label htmlFor="tags">Tags: </label>
        <input type="text" id="tags" onChange={(e) => {
          const tags = e.target.value.trim().split(',').map((tag) => tag.trim());
          setTags(tags);
        }} />
      </div>

      <div>
        <label htmlFor="description">Description: </label>
        <textarea id="description" onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>

      <button onClick={() => {
        addStudent({ name, email, tags, description });
        navigate('/');
      }}>Dodaj studenta(debila)</button>
    </div>
  );
};

export default Add;
