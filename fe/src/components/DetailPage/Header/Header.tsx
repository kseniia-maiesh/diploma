import { Button, Space, Typography } from 'antd';
import { BulbFilled, BulbOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface DetailHeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onAdd: () => void;
}

const DetailHeader: React.FC<DetailHeaderProps> = ({
  theme,
  onToggleTheme,
  onAdd,
}) => {
  return (
    <Space className='detail-page-header'>
      <Title level={2} className='detail-page-title'>
        Details
      </Title>

      <Space>
        <Button
          icon={theme === 'dark' ? <BulbFilled /> : <BulbOutlined />}
          onClick={onToggleTheme}
          size='large'
        >
          {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </Button>

        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={onAdd}
          size='large'
        >
          Add Detail
        </Button>
      </Space>
    </Space>
  );
};

export default DetailHeader;