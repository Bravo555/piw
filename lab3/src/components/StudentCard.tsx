import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavouritesContext } from '../contexts/FavouritesContext';
import Student from '../types/Student';

const StudentCard = ({ student }: { student: Student }) => {
  const [state, dispatch] = useContext(FavouritesContext);
  const isFavourite = state.favourites.includes(student.id);

  const addFavourite = () => dispatch({ type: 'addFavourite', payload: { studentId: student.id } });
  const removeFavourite = () => dispatch({ type: 'removeFavourite', payload: { studentId: student.id } });

  return (
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
        {!isFavourite ?
          <button onClick={addFavourite}>Dodaj do ulubionych</button> :
          <button onClick={removeFavourite}>Usuń z ulubionych</button>}
      </div>
      <div>
        <Link to={`/sendmessage/student/${student.id}`}>Wyślij wiadomość</Link>
      </div>
    </div>
  );
};

export default StudentCard;
