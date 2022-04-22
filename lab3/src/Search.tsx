import { useState } from "react"
import StudentCard from "./StudentCard"

const Search = ({ students }: { students: { name: string, description: string, tags?: string[] }[] }) => {
  const [name, setName] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState('');

  return (
    <>
      <h2>Search:</h2>

      <div>
        <div>
          <label htmlFor="name">Name: </label>
          <input type="text" id="name" onChange={(e) => setName(e.target.value.toLowerCase())} />
        </div>

        <div>
          <label htmlFor="tags">Tags: </label>
          <input type="text" id="tags" onChange={(e) => {
            let tags = e.target.value.trim().split(',').map((tag) => tag.trim());
            setTags(tags);
          }} />
        </div>

        <div>
          <label htmlFor="description">Description: </label>
          <textarea id="description" onChange={(e) => setDescription(e.target.value.toLowerCase())}></textarea>
        </div>
      </div>

      <h2>Studenci:</h2>
      <ul className='flex-list'>
        {students
          .filter((student) =>
            student.name.toLowerCase().includes(name)
            // && student.tags?.find((tag) => tag.includes()))
            && student.description.includes(description)
          ).map((student, i) => <li key={i}><StudentCard student={student} /></li>)}
      </ul>
      {tags}
    </>
  )
}

export default Search
