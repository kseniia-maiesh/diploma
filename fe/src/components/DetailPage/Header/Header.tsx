import React from 'react';
import { Button, Space, Typography, Dropdown } from 'antd';
import { BulbFilled, BulbOutlined, PlusOutlined, BarChartOutlined, DownloadOutlined } from '@ant-design/icons';

import { exportItems } from '../../../constants/constants';

const { Title } = Typography;

interface DetailHeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onAdd: () => void;
  onOpenStatus: () => void;
}

const DetailHeader: React.FC<DetailHeaderProps> = ({
  theme,
  onToggleTheme,
  onAdd,
  onOpenStatus,
}) => {
  return (
    <Space className='detail-page-header'>
      <Title level={2} className='detail-page-title'>
        Details
      </Title>

      <Space className='detail-header-actions'>
        <Button icon={<BarChartOutlined />} onClick={onOpenStatus}>
          Analytics
        </Button>

        <Dropdown menu={{ items: exportItems }}>
          <Button icon={<DownloadOutlined />}>Export</Button>
        </Dropdown>

        <Button
          icon={theme === 'dark' ? <BulbFilled /> : <BulbOutlined />}
          onClick={onToggleTheme}
        >
          {theme === 'dark' ? 'Light' : 'Dark'}
        </Button>

        <Button type='primary' icon={<PlusOutlined />} onClick={onAdd}>
          Add Detail
        </Button>
      </Space>
    </Space>
  );
};

export default DetailHeader;
