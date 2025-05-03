import React from 'react';
import { Skeleton, Table } from 'antd';

import Container from '../Container';

const TableLayout: React.FC = () => {
  const columns = [
    { title: 'Column 1', dataIndex: 'col1', key: 'col1' },
    { title: 'Column 2', dataIndex: 'col2', key: 'col2' },
    { title: 'Column 3', dataIndex: 'col3', key: 'col3' },
  ];

  const data = Array.from({ length: 3 }).map((_, index) => ({
    key: index,
    col1: (
      <Skeleton.Input
        active
        size="small"
        style={{ width: 80 }}
      />
    ),
    col2: (
      <Skeleton.Input
        active
        size="small"
        style={{ width: 120 }}
      />
    ),
    col3: (
      <Skeleton.Input
        active
        size="small"
        style={{ width: 100 }}
      />
    ),
  }));

  return (
    <Container>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </Container>
  );
};

export default TableLayout;
