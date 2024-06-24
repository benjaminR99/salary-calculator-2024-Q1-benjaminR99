import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

// Define getPriorityColor function outside the component
const getPriorityColor = (priority) => {
  switch (priority) {
    case 'HIGH':
      return 'red';
    case 'MEDIUM':
      return 'yellow';
    case 'LOW':
      return 'blue';
    default:
      return 'grey';
  }
};

// Different SVG Bell Icon Component
const BellIcon = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
    <path fill={color} d="M12 2c-4.91 0-8.85 3.94-8.85 8.85 0 2.4 1.08 4.61 2.96 6.1v4.06l2.85 2.85c.09.1.22.15.36.15s.27-.05.36-.15l2.79-2.79v-4.07c1.88-1.49 2.96-3.7 2.96-6.1C20.85 5.94 16.91 2 12 2zm0 2c3.54 0 6.41 2.87 6.41 6.41 0 1.74-.8 3.34-2.18 4.41l-.01.01-.01.01-4.22 4.22-4.22-4.22-.01-.01h-.01c-1.38-1.07-2.18-2.67-2.18-4.41C5.59 6.87 8.46 4 12 4zm0 16.5c-.25 0-.45-.2-.45-.45s.2-.45.45-.45.45.2.45.45-.2.45-.45.45z"/>
  </svg>
);

const TaskItem = ({ task, markAsDone }) => {
  const handleMarkAsDone = () => {
    markAsDone(task.id); // Call markAsDone function passed from TaskList
  };

  const formattedDate = format(new Date(task.createdAt), 'MMM dd'); // Format the date

  return (
    <TaskContainer>
      <PriorityIndicator priority={task.priority}>
        <BellIcon color="#fff" /> {/* Use the BellIcon component with color prop */}
      </PriorityIndicator>
      <TaskContent>
        <TaskText>{task.todo}</TaskText>
        <ButtonContainer>
          {task.completed ? (
            <DoneButton>In-Progress</DoneButton>
          ) : (
            <InProgressButton>Done</InProgressButton>
          )}
          <DateContainer>{formattedDate}</DateContainer>

        </ButtonContainer>
        {!task.completed && (
            <MarkAsDoneButton onClick={handleMarkAsDone}>
              <MarkAsDoneText>Mark as Done</MarkAsDoneText>
            </MarkAsDoneButton>
          )}
      </TaskContent>
    </TaskContainer>
  );
};

export default TaskItem;

const TaskContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

const PriorityIndicator = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ priority }) => getPriorityColor(priority)};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
`;

const TaskContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TaskText = styled.p`
  margin: 0 0 5px 0;
  flex: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const InProgressButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const DoneButton = styled.button`
  background-color: #28a745; /* Green color for done */
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #218838; /* Darker green on hover */
  }
`;

const DateContainer = styled.div`
  color: #666;
  font-size: 0.9em;
  border: 1px solid #ccc;  /* Border for the rounded rectangle */
  padding: 5px 10px;       /* Padding inside the border */
  border-radius: 10px;     /* Rounded corners */
  white-space: nowrap;     /* Ensure the date stays on one line */
  margin-left: 10px;
`;

const MarkAsDoneButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  margin-left: 10px;
`;

const MarkAsDoneText = styled.span`
  color: #6f42c1; /* Purple color for mark as done text */
  font-weight: bold;
`;

