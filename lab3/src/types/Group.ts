import Student from './Student';

type Group = {
    id: number,
    name: string,
    subject: string,
    size: number,
    members: Student[],
}

export default Group;
