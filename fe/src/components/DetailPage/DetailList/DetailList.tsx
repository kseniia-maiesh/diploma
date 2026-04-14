import { Card, Tag, Typography, Flex, Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { DetailListProps } from '../../../types/types';
import './DetailList.css';

const { Title, Text } = Typography;

function DetailList({
  id,
  name,
  description,
  type_name,
  status_name,
  image_url,
  theme,
  onDelete,
}: DetailListProps) {
  const themeClass = theme === 'dark' ? 'dark' : 'light';

  const getStatusColor = (status: string): string => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('identified') || statusLower.includes('active'))
      return '#52c41a';
    if (statusLower.includes('damaged') || statusLower.includes('error'))
      return '#f5222d';
    if (statusLower.includes('pending')) return '#faad14';
    return '#1890ff';
  };

  const getTypeClass = (type: string): string => {
    const typeLower = type.toLowerCase();
    if (typeLower.includes('memory')) return 'memory';
    if (typeLower.includes('gps') || typeLower.includes('radio')) return 'gps';
    if (typeLower.includes('microcontroller') || typeLower.includes('processor'))
      return 'processor';
    if (typeLower.includes('sensor')) return 'sensor';
    return 'default';
  };

  return (
    <Card
      hoverable
      className={`detail-card ${themeClass}`}
      cover={
        image_url ? (
          <div className='detail-card-image-container'>
            <img
              alt={name}
              src={image_url}
              className='detail-card-image'
              onError={(e) => {
                e.currentTarget.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='220'%3E%3Crect width='320' height='220' fill='%23667eea'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='white'%3ENo Image%3C/text%3E%3C/svg%3E";
              }}
            />
            <div className='detail-card-status-tag'>
              <Tag color={getStatusColor(status_name)}>{status_name}</Tag>
            </div>
          </div>
        ) : (
          <div className='detail-card-no-image'>
            No Image Available
          </div>
        )
      }
    >
      <Flex vertical gap='medium' className='detail-card-content'>
        <Flex justify='space-between' align='center'>
          <Title level={4} style={{ margin: 0 }}>{name}</Title>
          {onDelete && (
            <Popconfirm
              title='Delete component'
              description='Are you sure you want to delete this component?'
              onConfirm={() => onDelete(id)}
              okText='Yes'
              cancelText='No'
              okType='danger'
            >
              <Button
                type='text'
                danger
                icon={<DeleteOutlined />}
                size='small'
              />
            </Popconfirm>
          )}
        </Flex>
        <Text className={`detail-card-description ${themeClass}`}>
          {description}
        </Text>
        <div className='detail-card-tags'>
          <span className={`detail-type-tag ${getTypeClass(type_name)} ${themeClass}`}>
            {type_name}
          </span>
        </div>
      </Flex>
    </Card>
  );
}

export default DetailList;
