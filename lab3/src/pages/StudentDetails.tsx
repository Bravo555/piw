import { Link, useParams } from "react-router-dom";
import Student from "../types/Student";

const StudentDetails = ({ getStudent }: { getStudent: (id: string) => Student | null }) => {
  let error = (
    <div>
      nie ma studenta
    </div>
  );

  const { studentId } = useParams();
  if (!studentId) {
    return error;
  }

  const student = getStudent(studentId);
  if (!student) {
    return error;
  }

  return (
    <div>
      <div className="card_title">{student.name}</div>
      <img src={student.imageUrl} alt="" />
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
};

export default StudentDetails;
