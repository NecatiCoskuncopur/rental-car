import React, { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

import theme from '@/theme';
import { commonQuestionsData } from '@/data';
import Container from './Container';
import SectionHeading from './SectionHeading';

const CommonQuestions = () => {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  const toggleItem = (id: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Container>
      <SectionHeading
        title="Frequently Asked Questions"
        subtitle="Find quick answers to the most common questions about our services and policies."
        variant="dark"
      />
      <ul>
        {commonQuestionsData.map((item) => (
          <ListItem key={item.id}>
            <Header
              onClick={() => toggleItem(item.id)}
              isOpen={!!openItems[item.id]}
            >
              <span>{item.title}</span>
            </Header>
            <AnimatePresence>
              {openItems[item.id] && (
                <MotionAnswerContainer
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <p>{item.answer}</p>
                </MotionAnswerContainer>
              )}
            </AnimatePresence>
          </ListItem>
        ))}
      </ul>
    </Container>
  );
};

export default CommonQuestions;

const ListItem = styled.li`
  padding: ${theme.spacing.$6};
  border: 1px solid ${theme.colors.lightGray};
  border-radius: 5px;
  background-color: ${theme.colors.white};
  box-shadow: 0px 4px 4px 0px rgba(241, 241, 241, 0.2509803922);
  &:not(:last-child) {
    margin-bottom: ${theme.spacing.$6};
  }
`;

const Header = styled.header.withConfig({ shouldForwardProp: (props) => props !== 'isOpen' })<{ isOpen: boolean }>`
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.blackGray};
  position: relative;
  cursor: pointer;
  span {
    max-width: 90%;
    display: block;
  }
  &::after {
    font-family: 'Fontawesome';
    content: '\f13a';
    position: absolute;
    top: 50%;
    right: 0;
    font-size: ${theme.typography.fontSizes.$3};
    transform: translateY(-50%);
    color: ${(props) => (props.isOpen ? theme.colors.warningOrange : theme.colors.gray)};
    transition: 300ms all ease;
  }
`;

const MotionAnswerContainer = styled(motion.div)`
  overflow: hidden;
  p {
    margin-top: ${theme.spacing.$5};
    color: ${theme.colors.darkGray};
  }
`;
