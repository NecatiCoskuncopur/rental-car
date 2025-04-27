import { createGlobalStyle } from 'styled-components';

import theme from './theme';

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    list-style: none;
    border: none;
    text-decoration: none;
    box-sizing: border-box;
  }

  body {
    font-family: "Fira Sans", sans-serif;
    line-height: 1.5;
    background-color: ${theme.colors.softRed};
   

    a {
      text-decoration: none;
      color: inherit;
    }
  }
`;

export default GlobalStyles;
