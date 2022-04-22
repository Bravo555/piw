import { useState } from "react";

const Add = ({ addStudent }: { addStudent: Function }) => {
    const [name, setName] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [description, setDescription] = useState('');

    return (<div>
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

        <button onClick={() => addStudent({ name, tags, description })}>Dodaj studenta(debila)</button>
    </div>)
}

export default Add
