import react from 'react';
import Group from '../types/Group';

type GroupsState = {
  subjects: string[],
  size: number
};

class Groups extends react.Component<{ groups: Group[] }, GroupsState> {
  state: GroupsState = {
    subjects: [],
    size: 0
  };


  render() {
    return (
      <div>
        <div>
          <div>
            <label htmlFor="subjects">Subjects: </label>
            <input type="text" id="subjects" onChange={(e) =>
              this.setState(state => ({
                ...state,
                subjects: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '')
              }))
            } />
          </div>
          <div>
            <label htmlFor="size">Size: </label>
            <input type="number" id="size" onChange={(e) =>
              this.setState(state => ({
                ...state,
                size: parseInt(e.target.value) || 0
              }))
            } />
          </div>
        </div>
        <h2>Grupy:</h2>
        <ul className='flex-list'>
          {this.props.groups
            .filter(group => this.state.size === 0 || group.size === this.state.size)
            .filter(group => this.state.subjects.length === 0
              || this.state.subjects.find(s =>
                group.subject.toLowerCase().includes(s.toLowerCase())
              ))
            .map((group, i) => <li key={i}>
              <div className='card'>
                <div>Przedmiot: {group.subject}</div>
                <div>Rozmiar: {group.size}</div>
                <div>
                  Members:
                  <ul>
                    {group.members.map((member, i) => <li key={i}>{member.name}</li>)}
                    {Array(Math.max(group.size - group.members.length, 0))
                      .fill(<li key={group.members.length + i + 1}>[Wolne]</li>)}
                  </ul>
                </div>
              </div>
            </li>
            )}
        </ul>
      </div>
    );
  }
}

export default Groups;
