import styled from 'styled-components';
import ReactPaginate from 'react-paginate';

import theme from '@/theme';

const Paginate = styled(ReactPaginate)`
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin-top: ${theme.spacing.$7};
  justify-content: center;

  li {
    border: solid 1px ${theme.colors.coolGray};
    background-color: ${theme.colors.white};
    border-radius: 10px;
    padding: ${theme.spacing.$4} ${theme.spacing.$6};
    font-size: ${theme.typography.fontSizes.$3};
    margin-right: ${theme.spacing.$4};
    color: ${theme.colors.darkerGray};
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 300ms all ease-in-out;
    &.selected,
    &:hover {
      background-color: ${theme.colors.coolSurf};
      color: ${theme.colors.white};
      border-color: ${theme.colors.coolSurf};
    }
    &.next,
    &.previous {
      height: 38px;
      width: auto;
      padding: 0 ${theme.spacing.$6};
      &:hover {
        color: ${theme.colors.darkerGray};
        background-color: ${theme.colors.bgLight};
        border-color: ${theme.colors.coolGray};
      }
      &.disabled {
        cursor: not-allowed;
        background-color: unset;
      }
    }
  }
`;

export default Paginate;
