// src/components/Sidebar.js
import React from 'react';
import styled from 'styled-components';
import { FaHome } from 'react-icons/fa';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #4a148c;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 1200px) {
    transform: ${(props) => (props.open ? 'translateX(0)' : 'translateX(-100%)')};
  }
`;

const Logo = styled.h1`
  margin-bottom: 20px;
  font-size: 1.5em;
`;

const SidebarItem = styled.div`
  padding: 10px 0;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #6a1b9a;
  }

  svg {
    margin-right: 10px;
  }
`;

const Sidebar = ({ open }) => {
  return (
    <SidebarContainer open={open}>
      <Logo>AcmY Solutions</Logo>
      <SidebarItem>
        <FaHome />
        Dashboard
      </SidebarItem>
    </SidebarContainer>
  );
};

export default Sidebar;
