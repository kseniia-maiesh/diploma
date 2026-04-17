import React, { useMemo } from 'react';
import { Modal, Card } from 'antd';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { Stats } from '../../../types/types';
import { COLORS } from '../../../constants/constants';

type Props = {
  open: boolean;
  onCancel: () => void;
  stats: Stats[];
};

const DetailStats: React.FC<Props> = ({ open, onCancel, stats }) => {
  const chartData = useMemo(() => {
    return stats.map((item) => ({
      name: item.origin_country,
      value: item.count,
    }));
  }, [stats]);

  const topCountry = stats[0];

  return (
    <Modal
      title='Analytics by Country'
      open={open}
      onCancel={onCancel}
      footer={null}
      width={700}
    >
      <Card>
        <div style={{ marginBottom: 16 }}>
          Top country: <b>{topCountry?.origin_country}</b> ({topCountry?.count})
        </div>

        <ResponsiveContainer width='100%' height={400}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey='value'
              nameKey='name'
              outerRadius={120}
              label={({ percent }) =>
              percent ? `${(percent * 100).toFixed(0)}%` : ''
            }
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip formatter={(value) => `${value} components`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </Modal>
  );
};

export default DetailStats;
