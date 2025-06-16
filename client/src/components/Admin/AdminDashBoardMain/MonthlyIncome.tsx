import React, { useState } from 'react';
import { Alert, Select, Spin } from 'antd';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import theme from '@/theme';
import { useFetchData } from '@/hooks';
import { Header } from './style';

const MonthlyIncome = () => {
  const { data: incomeData, loading: incomeLoading, error: incomeError } = useFetchData<IIncome[]>('/api/income/monthly');
  const [selectedYear, setSelectedYear] = useState<string>('2025');

  const allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const filteredData = incomeData?.filter((item) => item._id.startsWith(selectedYear));

  const chartData = allMonths.map((month, index) => {
    const monthStr = (index + 1).toString().padStart(2, '0');
    const fullId = `${selectedYear}-${monthStr}`;
    const monthData = filteredData?.find((item) => item._id === fullId);

    return {
      month,
      Income: monthData ? monthData.totalIncome : 0,
    };
  });
  const handleYearChange = (value: string) => {
    setSelectedYear(value);
  };

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

  const uniqueYears = Array.from(new Set(incomeData?.map((item) => item._id.split('-')[0]) ?? []));

  return (
    <>
      <Header>
        <h1>Monthly Income</h1>
        <Select
          defaultValue={selectedYear}
          onChange={handleYearChange}
          options={uniqueYears.map((year) => ({ value: year, label: year }))}
        />
      </Header>
      <ResponsiveContainer
        width="100%"
        height={400}
      >
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 30, bottom: 50 }}
        >
          <XAxis
            dataKey="month"
            angle={-45}
            textAnchor="end"
            dy={10}
          />
          <YAxis />
          <Tooltip />

          <Bar
            dataKey="Income"
            fill={theme.colors.steelBlue}
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default MonthlyIncome;
