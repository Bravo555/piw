import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select, { MultiValue } from 'react-select';
import Group from '../types/Group';
import Student from '../types/Student';

const Add = ({ addGroup, students }: { addGroup: (s: Omit<Group, "id">) => void, students: Student[] }) => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [size, setSize] = useState(0);
  const [members, setMembers] = useState<Student[]>([]);
  const navigate = useNavigate();

  const selectOptions = students.map(student => ({ value: student, label: student.name }));

  const handleMembersChange = (options: MultiValue<{ label: string, value: Student }>) => {
    const sizeInput = document.getElementById('size') as HTMLInputElement;
    sizeInput?.setAttribute('min', options.length.toString());
    sizeInput.value = Math.max(parseInt(sizeInput.value) || 0, options.length).toString();
    console.log(options.length);
    console.log(document.getElementById("size"));

    setMembers(options.map(option => option.value));
    setSize(parseInt(sizeInput.value))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (size < members.length) {
      return;
    }
    addGroup({ name, subject, size, members });
    navigate('/');
  };

  return (
    <>
      <h2>Dodaj grupę:</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nazwa: </label>
          <input required type="text" id="name" onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label htmlFor="subject">Przedmiot: </label>
          <input required type="text" id="subject" onChange={(e) => setSubject(e.target.value)} />
        </div>

        <div>
          <label htmlFor="size">Rozmiar: </label>
          <input required type="number" id="size" onChange={(e) => {
            setSize(parseInt(e.target.value));
          }} />
        </div>

        <div>
          <label htmlFor="description">Członkowie: </label>
        </div>
        <div className="selectinput">
          <Select isMulti options={selectOptions} onChange={handleMembersChange} />
        </div>

        <input type="submit" value="Dodaj grupę (debili)" />
      </form>
    </>
  );
};

export default Add;
