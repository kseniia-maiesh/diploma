import { Table, Button, Space, Dropdown, Avatar, Tag, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, DownloadOutlined } from '@ant-design/icons';
import ReactCountryFlag from 'react-country-flag';

import { DetailItem } from '../../../types/types';
import { typeDescriptions, getExportMenu } from '../../../constants/constants';
import { getCountryCode, getTypeClass, getStatusColor } from '../../../shared/shared';

import './Table.css';

type Props = {
  data: DetailItem[];
  onDelete: (id: number) => void;
  onEdit: (item: DetailItem) => void;
  theme: 'dark' | 'light';
};

const DetailTable: React.FC<Props> = ({ data, theme, onDelete, onEdit }) => {
  const themeClass = theme === 'dark' ? 'dark' : 'light';
  const columns = [
    {
      title: '',
      key: 'avatar',
      width: 50,
      render: (_: unknown, record: DetailItem) => (
        <Avatar
          className='list-avatar'
          size={32}
          src={record.image_url}
          icon={!record.image_url}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Type',
      render: (_: unknown, record: DetailItem) => (
        <Tooltip title={typeDescriptions[record.type_name] || record.type_name}>
          <Tag className={`detail-type-tag ${getTypeClass(record.type_name)} ${themeClass}`}>
            {record.type_name}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status_name',
      render: (_: unknown, record: DetailItem) => (
        <Tag color={getStatusColor(record.status_name)}>{record.status_name}</Tag>
      ),
    },
    {
      title: 'Country',
      render: (_: any, record: DetailItem) => (
        <Space>
          <ReactCountryFlag
            countryCode={getCountryCode(record.origin_country) || 'UN'}
            svg
          />
          {record.origin_country}
        </Space>
      ),
    },
    {
      title: 'Actions',
      render: (_: any, record: DetailItem) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record.id)}
          />
          <Dropdown menu={{ items: getExportMenu(record.id) }}>
            <Button icon={<DownloadOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <Table columns={columns} dataSource={data} rowKey='id' pagination={false} />
  );
};

export default DetailTable;
