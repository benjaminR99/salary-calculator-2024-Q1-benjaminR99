// src/components/TaskChart.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../redux/tasksSlice';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const TaskChart = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const status = useSelector(state => state.tasks.status); // Ensure correct path to tasks in Redux state
  console.log('Tasks:', tasks);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  // Calculate counts for each priority level dynamically
  const countHigh = tasks.filter(task => task.priority === 'HIGH').length;
  const countMedium = tasks.filter(task => task.priority === 'MEDIUM').length;
  const countLow = tasks.filter(task => task.priority === 'LOW').length;

  console.log('Counts:', { countHigh, countMedium, countLow });

  const data = [
    { name: 'High', value: countHigh },
    { name: 'Medium', value: countMedium },
    { name: 'Low', value: countLow },
  ];

  const COLORS = ['#FF0000', '#FFFF00', '#0000FF'];

  const renderCustomLegend = (props) => {
    const { payload } = props;
    return (
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: entry.color,
              marginRight: '10px'
            }} />
            {entry.value}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <PieChart width={500} height={400}>
      <Pie dataKey="value" data={data} cx={200} cy={200} outerRadius={120} fill="#8884d8">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend content={renderCustomLegend} layout="vertical" verticalAlign="middle" align="right" />
    </PieChart>
  );
};

export default TaskChart;
