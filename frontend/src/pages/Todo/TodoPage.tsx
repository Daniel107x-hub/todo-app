import {Button, Card} from "react-bootstrap";
import styles from "./TodoPage.module.css";
import {useEffect, useState} from "react";
import { Todo } from '../../types/Todo';
import {useCreateTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation, useGetTodosQuery} from "../../redux/Todo/TodoApi";
import {FaRegTrashAlt} from "react-icons/fa";
import {toast} from "react-toastify";
import Loader from "../../components/Common/Loader";
import {MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank} from "react-icons/md";

type NewTodo = {
    title: string;
    description: string;
}

const TodoPage = () => {
    const response = useGetTodosQuery();
    const [createTodo, {isSuccess: wasCreationSuccess}] = useCreateTodoMutation();
    const [deleteTodo, {isSuccess: wasDeleteSuccess}] = useDeleteTodoMutation()
    const [updateTodo, {isSuccess: wasUpdateSuccess}] = useUpdateTodoMutation();
    const [newTodo, setNewTodo] = useState<NewTodo>({
        title: "",
        description: ""
    });
    const [todos, setTodos] = useState<Todo[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo((todo: NewTodo) => {
            return {
                title: e.target.value,
                description: todo?.description || ""
            }
        });
    };

    const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewTodo((todo: NewTodo) => {
            return {
                title: todo?.title || "",
                description: e.target.value
            }
        });
    };

    const isNewTodoValid = () => {
        return newTodo?.title?.trim().length > 0;
    };

    const handleClearTodo = () => {
        setNewTodo({
            title: "",
            description: ""
        });
    };

    const handleAddTodo = () => {
        const todo: Todo = {
            id: 0,
            completed: false,
            ...newTodo
        };
        createTodo(todo);
        handleClearTodo();
    }

    useEffect(() => {
        if(wasDeleteSuccess) toast.success("Todo deleted!");
    }, [wasDeleteSuccess]);

    useEffect(() => {
        if(wasCreationSuccess) toast.success("Successfully created");
    }, [wasCreationSuccess]);

    useEffect(() => {
        if(wasUpdateSuccess) toast.success("Successfully updated");
    }, [wasUpdateSuccess]);

    const handleDelete = (id: number) => {
        deleteTodo(id);
    }

    const handleComplete = (todo: Todo) => {
        updateTodo({
            ...todo,
            completed: !todo.completed
        })
    }

    useEffect(() => {
        if(response.isLoading) setIsLoading(true);
        if(response.data){
            setTodos(response.data);
            setIsLoading(false)
        }
    }, [response]);

    if(isLoading) return <Loader/>
    return (
        <div className={styles.todoPage}>
            <section className={styles.newTodo}>
               <Card className={styles.newTodoCard}>
                    <Card.Body>
                        <Card.Title>Add a new item!</Card.Title>
                        <div className={styles.input}>
                            <div className={styles.details}>
                                <input type="text" placeholder="Title" maxLength={30} onChange={handleChangeTitle} value={newTodo?.title}/>
                                <textarea placeholder="Description" maxLength={200} onChange={handleChangeDescription} value={newTodo?.description}/>
                            </div>
                            <div className={styles.actions}>
                                <Button variant="danger" disabled={!isNewTodoValid()} onClick={handleClearTodo}>Clear</Button>
                                <Button variant="primary" disabled={!isNewTodoValid()} onClick={handleAddTodo}>Add todo</Button>
                            </div>
                        </div>
                    </Card.Body>
               </Card>
            </section>
            <section className={styles.todos}>
                {
                    todos.length === 0 && <div>No todos yet!</div>
                }
                {
                    todos.map((todo: Todo) => {
                        return (
                            <Card key={todo.id} className={`${styles.todo} ${todo.completed ? styles.completed : ''}`}>
                                <Card.Body>
                                    <Card.Title>{todo.title}</Card.Title>
                                    <Card.Text>{todo.description}</Card.Text>
                                </Card.Body>
                                <Card.Footer className={styles.actions}>
                                    <FaRegTrashAlt onClick={() => handleDelete(todo.id)} className={styles.delete}/>
                                    {
                                        todo.completed && <MdOutlineCheckBox onClick={() => handleComplete(todo)} className={styles.checkbox}/>
                                    }
                                    {
                                        !todo.completed && <MdOutlineCheckBoxOutlineBlank onClick={() => handleComplete(todo)} className={styles.checkbox}/>
                                    }
                                </Card.Footer>
                            </Card>
                        )
                    })
                }
            </section>
        </div>
    )
}

export default TodoPage;