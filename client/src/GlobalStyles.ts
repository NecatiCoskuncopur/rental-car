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
    &.ant-input,
    &.ant-input-password,
    &.ant-input-search,
    &.ant-input-textarea,
    &.ant-picker {
      padding: 8px 6px;
      width: 100%;
    }
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
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
