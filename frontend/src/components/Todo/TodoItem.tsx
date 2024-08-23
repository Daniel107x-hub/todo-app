import React, {useEffect, useState} from 'react';
import {Button, Card, Modal} from "react-bootstrap";
import {FaRegTrashAlt} from "react-icons/fa";
import {MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank} from "react-icons/md";
import {Todo} from "../../types/Todo";
import {toast} from "react-toastify";
import {useDeleteTodoMutation, useUpdateTodoMutation} from "../../redux/Todo/TodoApi";
import styles from "./TodoItem.module.css";

export type TodoProps = {
    todo: Todo;
}

function TodoItem({todo}:TodoProps) {
    const [deleteTodo, {isSuccess: wasDeleteSuccess}] = useDeleteTodoMutation()
    const [updateTodo, {isSuccess: wasUpdateSuccess}] = useUpdateTodoMutation();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [updatedTodo, setUpdatedTodo] = useState<Todo>(todo);

    const handleDelete = (e: React.MouseEvent) => {
        deleteTodo(todo.id);
        e.stopPropagation();
    }
    const handleComplete = (e: React.MouseEvent) => {
        updateTodo({
            ...todo,
            completed: !todo.completed
        });
        e.stopPropagation();
    }

    const handleUpdatedTodo = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setUpdatedTodo({
            ...updatedTodo,
            [e.target.name]: e.target.value.trimStart()
        });
    }

    const handleConfirmUpdate = () => {
        updateTodo(updatedTodo);
        setShowModal(false);
    }

    const handleModalClosed = () => {
        setShowModal(false);
        setUpdatedTodo(todo);
    }

    useEffect(() => {
        if(wasDeleteSuccess) toast.success("Todo deleted!");
    }, [wasDeleteSuccess]);

    useEffect(() => {
        if(wasUpdateSuccess) toast.success("Successfully updated");
    }, [wasUpdateSuccess]);

    return (
        <>
            <Modal onHide={handleModalClosed} show={showModal} centered className={styles.modal}>
                <Modal.Header closeButton>
                    <Modal.Title className={styles.modalTitle}>
                        <input type="text" name="title" maxLength={30} value={updatedTodo.title} onChange={handleUpdatedTodo} className={`${styles.title} ${updatedTodo.title.trim() === '' ? styles.failed : ''}`}/>
                        <label htmlFor="title">Title</label>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalContent}>
                    <textarea name="description" maxLength={200} value={updatedTodo.description} onChange={handleUpdatedTodo} className={`${styles.description} ${updatedTodo.description.trim() === '' ? styles.failed : ''}`}/>
                    <label htmlFor="description">Description</label>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleConfirmUpdate} disabled={updatedTodo.title.trim() === '' || updatedTodo.description.trim() === ''}>Update</Button>
                </Modal.Footer>
            </Modal>
            <Card key={todo.id} className={`${styles.todo} ${todo.completed ? styles.completed : ''}`} onClick={() => setShowModal(true)}>
                <Card.Body>
                    <Card.Title>{todo.title}</Card.Title>
                    <Card.Text>{todo.description}</Card.Text>
                </Card.Body>
                <Card.Footer className={styles.actions}>
                    <FaRegTrashAlt onClick={handleDelete} className={styles.delete}/>
                    {
                        todo.completed && <MdOutlineCheckBox onClick={handleComplete} className={styles.checkbox}/>
                    }
                    {
                        !todo.completed && <MdOutlineCheckBoxOutlineBlank onClick={handleComplete} className={styles.checkbox}/>
                    }
                </Card.Footer>
            </Card>
        </>
    );
}

export default TodoItem;