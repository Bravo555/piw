type Student = {
    id: number,
    name: string,
    email: string,
    description: string,
    tags?: string[],
    // TODO: replace with enums
    subjects?: string[],
    imageUrl?: string
    thumbUrl?: string
};

export default Student;
