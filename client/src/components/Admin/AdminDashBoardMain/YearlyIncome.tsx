import React from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Alert, Spin } from 'antd';

import theme from '@/theme';
import { useFetchData } from '@/hooks';
import { Header } from './style';

const COLORS = [theme.colors.warningOrange, theme.colors.steelBlue, theme.colors.bgExtraLight, theme.colors.coolSurf, theme.colors.blue];

const YearlyIncome = () => {
  const { data: incomeData, loading: incomeLoading, error: incomeError } = useFetchData<IIncome[]>('/api/income/yearly');

  if (incomeLoading) return <Spin />;
  if (incomeError)
    return (
      <Alert
        message="Error"
        description={incomeError}
        type="error"
        showIcon
      />
    );

  const yearlyIncomeMap: Record<string, number> = {};

  incomeData?.forEach(({ _id, totalIncome }) => {
    const year = _id.toString();
    yearlyIncomeMap[year] = (yearlyIncomeMap[year] || 0) + totalIncome;
  });

  const chartData = Object.keys(yearlyIncomeMap).map((year, index) => ({
    name: year,
    value: yearlyIncomeMap[year],
    color: COLORS[index % COLORS.length],
  }));

  const valueFormatter = (value: number) => `$${value.toLocaleString()}`;
  return (
    <>
      <Header>
        <h1>Yearly Income</h1>
      </Header>
      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
              />
            ))}
          </Pie>
          <Tooltip formatter={valueFormatter} />
        </PieChart>
      </ResponsiveContainer>

      <TagsContainer>
        {chartData.map((entry) => (
          <Tag
            key={entry.name}
            color={entry.color}
          >
            {entry.name}
          </Tag>
        ))}
      </TagsContainer>
    </>
  );
};

export default YearlyIncome;

const TagsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: ${theme.spacing.$4};
`;

const Tag = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.$3} ${theme.spacing.$4};
  margin: ${theme.spacing.$2};
  border-radius: 20px;
  background: ${({ color }) => color};
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSizes.$2};
  font-weight: ${theme.typography.fontWeights.bold};
`;
