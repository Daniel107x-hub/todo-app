export type Todo = {
    id: number;
    title: string;
    description: string;
    completed: boolean;
};

export type User = {
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
    dateOfBirth?: string;
}