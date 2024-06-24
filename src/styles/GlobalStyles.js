// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
  }

  #root {
    display: flex;
    flex-direction: column;
  }
`;

export default GlobalStyles;
