import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import { useModal } from './contexts/ModalContext';
import { getBoards, getUsers, createTask, updateStatus, updateTask } from '../axios';

const priorities = ['Low', 'Medium', 'High'];
const statuses = ['Backlog', 'InProgress', 'Done'];

const ModalForm = ({ task, mode, users, boards, onChange, errors }) => {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    boardId: task?.boardId || '',
    priority: task?.priority || '',
    status: task?.status || '',
    assigneeId: task?.assignee?.id || '',
  });

  useEffect(() => {
    setFormData({
      title: task?.title || '',
      description: task?.description || '',
      boardId: task?.boardId || '',
      priority: task?.priority || '',
      status: task?.status || '',
      assigneeId: task?.assignee?.id || '',
    });
    onChange(formData);
  }, []);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    onChange({ ...formData, [field]: value });
  };

  return (
    <Form>
      <FloatingLabel controlId="floatingInputGrid" label="Название" className="mb-3">
        <Form.Control
          placeholder="Название"
          value={formData.title}
          onChange={handleChange('title')}
          isInvalid={!!errors.title}
          autoComplete="off"/>
        <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea" label="Описание" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Описание"
          style={{ height: '100px' }}
          value={formData.description}
          onChange={handleChange('description')}
          isInvalid={!!errors.description}
        />
        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
      </FloatingLabel>
      <Form.Select
        aria-label="Default select example"
        className={cn({'mb-3': !errors.boardId})}
        disabled={mode.startsWith('edit')}
        value={formData.boardId}
        onChange={handleChange('boardId')}
        isInvalid={!!errors.boardId}
      >
        {mode === 'create' && <option value="">Проект</option>}
        {mode.startsWith('edit')
        ? <option value={task.boardId}>{task.boardName}</option>
        : boards.map(board => <option key={board.id} value={board.id}>{board.name}</option>)}
      </Form.Select>
      <Form.Control.Feedback type="invalid" className="mb-3">{errors.boardId}</Form.Control.Feedback>
      <Form.Select
        aria-label="Default select example"
        className={cn({'mb-3': !errors.priority})}
        value={formData.priority}
        onChange={handleChange('priority')}
        isInvalid={!!errors.priority}
      >
        {task
        ? <option>{task.priority}</option>
        : <option>Приоритет</option>}
        {task
        ? priorities.filter(priority => priority != task.priority).map(priority => <option key={priority} value={priority}>{priority}</option>)
        : priorities.map(priority => <option key={priority} value={priority}>{priority}</option>)}
      </Form.Select>
      <Form.Control.Feedback type="invalid" className="mb-3">{errors.priority}</Form.Control.Feedback>
      <Form.Select
        aria-label="Default select example"
        className={cn({'mb-3': !errors.status})}
        value={formData.status}
        onChange={handleChange('status')}
        isInvalid={!!errors.status}
      >
        {task
        ? <option>{task.status}</option>
        : <option>Статус</option>}
        {task
        ? statuses.filter(status => status != task.status).map(status => <option key={status} value={status}>{status}</option>)
        : statuses.map(status => <option  key={status} value={status}>{status}</option>)}
      </Form.Select>
      <Form.Control.Feedback type="invalid" className="mb-3">{errors.status}</Form.Control.Feedback>
      <Form.Select
        aria-label="Default select example"
        className={cn({'mb-3': !errors.assigneeId})}
        value={formData.assigneeId}
        onChange={handleChange('assigneeId')}
        isInvalid={!!errors.assigneeId}
      >
        {task
        ? <option value={task.assignee}>{task.assignee.fullName}</option>
        : <option>Исполнитель</option>}
        {task
        ? users.filter(user => user.id != task.assignee.id).map(user => <option key={user.id} value={user.id}>{user.fullName}</option>)
        : users.map(user => <option key={user.id} value={user.id}>{user.fullName}</option>)}
      </Form.Select>
      <Form.Control.Feedback type="invalid" className="mb-3">{errors.assigneeId}</Form.Control.Feedback>
    </Form>
  );
  
}

const ModalTask = () => {
  const { modal, closeModal, handleExited } = useModal();
  const [boards, setBoards] = useState([]);
  const [users, setUsers] = useState([]);
  const [formState, setFormState] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleClose = () => {
    setFormErrors({});
    setFormState({});
    closeModal();
  };

  useEffect(() => {
    const getData = async () => {
      const fetchedUsers = await getUsers();
      const fetchedBoards = await getBoards();
      setUsers(fetchedUsers);
      setBoards(fetchedBoards);
    };
    getData();
  }, []);

  const handleChange = (newFormData) => {
    setFormState(newFormData);
  };

  const validateForm = () => {
    const errors = {};
  
    if (!formState.title?.trim()) {
      errors.title = 'Название обязательно';
    }
    if (!formState.description?.trim()) {
      errors.description = 'Описание обязательно';
    }
    if (!formState.boardId) {
      errors.boardId = 'Проект обязателен';
    }
    if (!formState.priority) {
      errors.priority = 'Приоритет обязателен';
    }
    if (!formState.status) {
      errors.status = 'Статус обязателен';
    }
    if (!formState.assigneeId) {
      errors.assigneeId = 'Исполнитель обязателен';
    }
  
    setFormErrors(errors);
    
    return Object.keys(errors).length === 0;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (modal.mode.startsWith('edit') && modal.task) {
      const isChanged = 
        formState.title !== modal.task.title ||
        formState.description !== modal.task.description ||
        formState.priority !== modal.task.priority ||
        formState.status !== modal.task.status ||
        formState.boardId !== modal.task.boardId ||
        formState.assigneeId !== modal.task.assignee?.id;
      console.log(formState);
      if (!isChanged) {
        console.log('Никаких изменений не было');
        closeModal();
        return;
      }
    }

    if (!validateForm()) {
      return;
    }

    if (modal.mode.startsWith('edit')) {
      console.log('Обновляем задачу', formState);
      await updateTask({
        title: formState.title,
        description: formState.description,
        priority: formState.priority,
        status: formState.status,
        assigneeId: parseInt(formState.assigneeId, 10),
      }, modal.task.id);
      
    } else {
      console.log('Создаём задачу', formState);
      const { status } = formState;
      const taskId = await createTask({
        title: formState.title,
        description: formState.description,
        priority: formState.priority,
        boardId: parseInt(formState.boardId, 10),
        assigneeId: parseInt(formState.assigneeId, 10),
      });
      updateStatus(status, taskId);
    }
    closeModal();
  };

  const handleOpenBoard = (e) => {
    e.preventDefault();
    const id = e.target.dataset.boardId;
    handleClose();
    navigate(`/board/${id}`);
  }

  return (
    <Modal show={modal.show} onHide={handleClose} onExited={handleExited} className='modal-lg'>
      <Modal.Header closeButton>
        <Modal.Title>
          {modal.mode.startsWith('edit') ? 'Редактировать задачу' : 'Создать задачу'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ModalForm
          task={modal.task}
          mode={modal.mode}
          users={users}
          boards={boards}
          onChange={handleChange}
          errors={formErrors}
        />
      </Modal.Body>

      <Modal.Footer className='d-flex justify-content-between'>
        {modal.mode === 'editFromTasks' && (
          <Button
            variant="secondary"
            onClick={handleOpenBoard}
            data-board-id={modal.task?.boardId}
          >
            Перейти к проекту
          </Button>
        )}
        <Button
          variant="primary"
          onClick={handleSubmit}
        >
          {modal.mode.startsWith('edit') ? 'Обновить' : 'Создать'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalTask;
