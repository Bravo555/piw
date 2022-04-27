import { Link } from 'react-router-dom';
import Student from '../types/Student';

// its kinda verbose but meh
const StudentCard = ({ student }: { student: Student }) => (
  <div className="card">
    <div>{student.name}</div>
    <div>{student.description || 'No description.'}</div>
    {
      student.tags ? (
        <div>
          <hr />
          Tags:
          <ul className="tags">
            {student.tags?.map((tag, i) => <li key={i} className="tag">{tag}</li>)}
          </ul>
        </div>) : ''
    }
    <hr />
    <Link to={`/sendmessage/student/${student.id}`}>Wyślij wiadomość</Link>
  </div>
);

export default StudentCard;
