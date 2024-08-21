import React, {useEffect} from 'react';
import {Card} from "react-bootstrap";
import styles from "../../pages/Todo/TodoPage.module.css";
import {FaRegTrashAlt} from "react-icons/fa";
import {MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank} from "react-icons/md";
import {Todo} from "../../types/Todo";
import {toast} from "react-toastify";
import {useDeleteTodoMutation, useUpdateTodoMutation} from "../../redux/Todo/TodoApi";

export type TodoProps = {
    todo: Todo;
}

function TodoItem({todo}:TodoProps) {
    const [deleteTodo, {isSuccess: wasDeleteSuccess}] = useDeleteTodoMutation()
    const [updateTodo, {isSuccess: wasUpdateSuccess}] = useUpdateTodoMutation();
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
        if(wasDeleteSuccess) toast.success("Todo deleted!");
    }, [wasDeleteSuccess]);
    useEffect(() => {
        if(wasUpdateSuccess) toast.success("Successfully updated");
    }, [wasUpdateSuccess]);

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
    );
}

export default TodoItem;