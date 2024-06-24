import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TaskItem from './TaskItem';
import TaskChart from './TaskChart';
import Activity from './Activity';
import { IoIosArrowBack, IoIosArrowForward, IoIosNotifications, IoIosArrowDown } from 'react-icons/io';
import avatar from '../avatar.jpg'; // Ensure the correct path for the avatar image

const DashboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  /* Adjusted margin-left to prevent sidebar from completely disappearing */
  margin-left: 250px; 
  /* Adjust width to take full width when sidebar is hidden */
  width: calc(100% - 250px); 
  /* Ensuring responsiveness */
  @media (max-width: 1200px) {
    margin-left: 0;
    width: 100%;
  }
`;


const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

const WelcomeContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
`;

const WelcomeTitle = styled.h3`
  margin-bottom: 10px;
`;

const WelcomeText = styled.p`
  margin-bottom: 10px;
`;

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const TaskListContainer = styled.div`
  flex: 1 1 300px; /* Flex-grow, flex-shrink, flex-basis */
  margin-right: 20px;
  margin-bottom: 20px;
  min-width: 300px;
`;

const ActivityTaskContainer = styled.div`
  flex: 1 1 300px; /* Flex-grow, flex-shrink, flex-basis */
  display: flex;
  flex-direction: column;
  min-width: 300px;
  margin-top: 20px;
`;
const TaskListHeader = styled.h4`
  margin-bottom: 10px;
`;

const TaskList = styled.div`
  width: 100%;
  margin-top: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  position: relative;
  padding: 10px; /* Add padding for internal content */
`;


const ActivityFeed = styled.div`
  width: 100%;
  max-height: 300px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  position: relative;
  overflow-y: auto;
    /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c1c1c1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #a0a0a0;
  }

  &::-webkit-scrollbar-track {
    background-color: #f9f9f9;
  }
`;

const ActivityFeedHeader = styled.h4`
  position: sticky;
  top: 0;
  background-color: #f9f9f9;
  padding: 10px 20px;
  margin: 0;
  border-bottom: 1px solid #ddd;
  z-index: 1;
`;

const TaskChartHeader = styled.h4`
  position: sticky;
  top: 0;
  background-color: #f9f9f9;
  padding: 10px 20px;
  margin: 0;
  border-bottom: 1px solid #ddd;
  z-index: 1;
`;
const TaskChartContainer = styled.div`
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  border-radius: 5px;
  margin-top: 20px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: #f0f0f0;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #e0e0e0;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const Icon = styled.span`
  margin-right: 5px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 10px;
`;

const NotificationIcon = styled(IoIosNotifications)`
  margin-right: 10px;
`;

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const tasksPerPage = 8;

  useEffect(() => {
    fetch('https://6363c8f68a3337d9a2e7d805.mockapi.io/api/to-do')
      .then(response => response.json())
      .then(data => {
        setTasks(data); // Store all tasks (completed and not completed)
      });
  }, []);

  const markAsDone = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: true } : task
      )
    ); // Update task to mark as done
  };

  const pageCount = Math.ceil(tasks.length / tasksPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPagination = () => {
    const pages = [];

    if (currentPage === 0) {
      pages.push(
        <PaginationButton
          key="previous"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          <Icon><IoIosArrowBack /></Icon>
        </PaginationButton>
      );
      for (let i = 0; i < Math.min(pageCount, 3); i++) {
        pages.push(
          <PaginationButton
            key={i}
            onClick={() => handlePageChange(i)}
            disabled={currentPage === i}
          >
            {i + 1}
          </PaginationButton>
        );
      }
      pages.push(
        <PaginationButton
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <Icon><IoIosArrowForward /></Icon>
        </PaginationButton>
      );
    } else if (currentPage === pageCount - 1) {
      pages.push(
        <PaginationButton
          key="previous"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <Icon><IoIosArrowBack /></Icon>
        </PaginationButton>
      );
      for (let i = Math.max(0, pageCount - 3); i < pageCount; i++) {
        pages.push(
          <PaginationButton
            key={i}
            onClick={() => handlePageChange(i)}
            disabled={currentPage === i}
          >
            {i + 1}
          </PaginationButton>
        );
      }
      pages.push(
        <PaginationButton
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pageCount - 1}
        >
          <Icon><IoIosArrowForward /></Icon>
        </PaginationButton>
      );
    } else {
      pages.push(
        <PaginationButton
          key="previous"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <Icon><IoIosArrowBack /></Icon>
        </PaginationButton>
      );
      for (let i = Math.max(0, currentPage - 1); i <= Math.min(currentPage + 1, pageCount - 1); i++) {
        pages.push(
          <PaginationButton
            key={i}
            onClick={() => handlePageChange(i)}
            disabled={currentPage === i}
          >
            {i + 1}
          </PaginationButton>
        );
      }
      pages.push(
        <PaginationButton
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <Icon><IoIosArrowForward /></Icon>
        </PaginationButton>
      );
    }

    return (
      <PaginationContainer>
        {pages}
      </PaginationContainer>
    );
  };

  const pagesVisited = currentPage * tasksPerPage;
  const displayTasks = tasks
    .slice(pagesVisited, pagesVisited + tasksPerPage)
    .map(task => (
      <TaskItem key={task.id} task={task} markAsDone={markAsDone} />
    ));

  return (
    <DashboardContainer>
      <Header>
        <div>
          <h2>Dashboard</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <NotificationIcon size={24} />
          <Avatar src={avatar} alt="User Avatar" />
          <IoIosArrowDown size={24} style={{ marginLeft: '10px', cursor: 'pointer' }} />
        </div>
      </Header>
      <WelcomeContainer>
        <WelcomeTitle>Welcome back, John Doe</WelcomeTitle>
        <WelcomeText>The end of the year is coming. Are you planning your performance interviews? You can do this super efficiently with Acmy.</WelcomeText>
      </WelcomeContainer>
      <Section>
        <TaskListContainer>
          
          <TaskList>
          <TaskListHeader>Tasks</TaskListHeader>
            {displayTasks}
            {renderPagination()}
          </TaskList>
        </TaskListContainer>
        <ActivityTaskContainer>
          <ActivityFeed>
            <ActivityFeedHeader>Activity Feed</ActivityFeedHeader>
            <Activity />
          </ActivityFeed>
          <TaskChartContainer>
            <TaskChartHeader>Task Priorities</TaskChartHeader>
            <TaskChart /> {/* Renders the TaskChart component */}
          </TaskChartContainer>
        </ActivityTaskContainer>
      </Section>
    </DashboardContainer>
  );
};

export default Dashboard;
