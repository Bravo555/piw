// its kinda verbose but meh
const StudentCard = ({ student }: { student: { name: string, description: string, tags?: string[] } }) => (
  <div className="student-card">
    <div>{student.name}</div>
    <div>{student.description}</div>
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
  </div>
)

export default StudentCard;
