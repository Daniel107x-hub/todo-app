import {Button, Card} from "react-bootstrap";
import styles from "./TodoPage.module.css";
import { useState } from "react";
import { Todo } from '../../types/Todo';
import { useCreateTodoMutation, useGetTodosQuery} from "../../redux/Todo/TodoSlice";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/Auth/AuthSlice";
import { redirect, useNavigate } from "react-router-dom";

type NewTodo = {
    title: string;
    description: string;
}

const TodoPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [createTodo, result] = useCreateTodoMutation();
    const [newTodo, setNewTodo] = useState<NewTodo>({
        title: "",
        description: ""
    });

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
        // TODO: Show success message
        const todo: Todo = {
            id: 0,
            completed: false,
            ...newTodo
        };
        createTodo(todo);
        handleClearTodo();
    }

    const { data, error, isLoading } = useGetTodosQuery();
    if(error && 'status' in error && error.status === 401) {
        dispatch(logout());
        navigate("/login");
    }

    if(isLoading || !data) return <>Loading...</>
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
                    data.map((todo: Todo) => {
                        return (
                            <Card key={todo.id} className={styles.todo}>
                                <Card.Body>
                                    <Card.Title>{todo.title}</Card.Title>
                                    <Card.Text>{todo.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    })
                }
            </section>
        </div>
    )
}

export default TodoPage;