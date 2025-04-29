import React from 'react';
import Link from 'next/link';

import { footerData } from '@/data';
import { AnimatedList, ListItem, Title } from './styles';

const FooterLinks = () => {
  const listVariants = {
    hidden: { opacity: 0, y: 150 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
  };
  return (
    <>
      {footerData.map((item, index) => (
        <AnimatedList
          key={index}
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Title>{item.title}</Title>
          {item.navList.map((navItem, idx) => (
            <ListItem
              hasIcon={false}
              key={idx}
            >
              <Link href={navItem.href}>{navItem.text}</Link>
            </ListItem>
          ))}
        </AnimatedList>
      ))}
    </>
  );
};

export default FooterLinks;
