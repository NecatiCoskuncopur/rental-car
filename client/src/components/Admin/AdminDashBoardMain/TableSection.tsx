import React from 'react';
import { Alert, Table, TableProps } from 'antd';

import { Header, Link } from './style';

type TableSectionProps<T> = {
  title: string;
  href: string;
  error: string | null;
  loading: boolean;
  data: T[];
  columns: TableProps<T>['columns'];
};

const TableSection = <T extends { _id: string }>({ title, href, error, loading, data, columns }: TableSectionProps<T>) => {
  return (
    <>
      <Header>
        <h1>{title}</h1>
        <Link href={href}>See All</Link>
      </Header>
      {error ? (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
        />
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          rowKey="_id"
          pagination={false}
          loading={loading}
          bordered={false}
        />
      )}
    </>
  );
};

export default TableSection;
