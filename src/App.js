// src/App.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import GlobalStyles from './styles/GlobalStyles';

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ToggleButton = styled.button`
  display: none;
  @media (max-width: 1200px) {
    display: block;
    position: fixed;
    top: 10px;
    left: 20px;
    z-index: 1000;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
`;

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <ToggleButton onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </ToggleButton>
        <Sidebar open={sidebarOpen} />
        <Dashboard />
      </AppContainer>
    </>
  );
};

export default App;
