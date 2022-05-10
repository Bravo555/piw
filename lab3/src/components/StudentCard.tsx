import { Link } from 'react-router-dom';
import Student from '../types/Student';

// its kinda verbose but meh
const StudentCard = ({ student }: { student: Student }) => (
  <div className="card">
    <Link to={`/students/${student.id}`}>
      <div className="card_title">{student.name}</div>
      <img src={student.thumbUrl} alt="" />
    </Link>
    <div className="card_description">{student.description || 'No description.'}</div>
    {
      student.tags ? (
        <div>
          <hr />
          Tags:
          <ul className="tags">
            {student.tags?.map((tag: any, i: any) => <li key={i} className="tag">{tag}</li>)}
          </ul>
        </div>) : ''
    }
    <hr />
    <div>
      <Link to={`/sendmessage/student/${student.id}`}>Wyślij wiadomość</Link>
    </div>
  </div>
);

export default StudentCard;
