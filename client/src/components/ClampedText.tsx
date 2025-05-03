import styled from 'styled-components';

const ClampedText = styled.div.withConfig({ shouldForwardProp: (props) => props !== 'lineClamp' })<{ lineClamp: number }>`
  display: -webkit-box;
  -webkit-line-clamp: ${({ lineClamp }) => lineClamp || 2};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default ClampedText;
