import Student from './Student';

type Group = {
    name: string,
    subject: string,
    size: number,
    members: Student[],
}

export default Group;
