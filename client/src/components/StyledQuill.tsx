import dynamic from 'next/dynamic';
import styled from 'styled-components';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const StyledQuill = styled(ReactQuill)`
  height: 150px;
  margin-bottom: 50px;
`;

export default StyledQuill;
