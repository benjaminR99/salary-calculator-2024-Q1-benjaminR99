// src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, markAsDone } from '../redux/tasksSlice';
import TaskItem from './TaskItem';
import Pagination from './Pagination';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const status = useSelector(state => state.tasks.status);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const tasksPerPage = 8;
  const pagesVisited = currentPage * tasksPerPage;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  const handleMarkAsDone = (id) => {
    dispatch(markAsDone(id));
  };

  // Calculate number of pages based on tasks length and tasks per page
  const pageCount = Math.ceil(tasks.length / tasksPerPage);

  // Slice tasks array based on currentPage and tasksPerPage
  const displayTasks = tasks
    .slice(pagesVisited, pagesVisited + tasksPerPage)
    .map(task => (
      <TaskContainer key={task.id}>
        <TaskItem task={task} markAsDone={handleMarkAsDone} />
      </TaskContainer>
    ));

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      {displayTasks}
      <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
    </div>
  );
};

export default TaskList;
