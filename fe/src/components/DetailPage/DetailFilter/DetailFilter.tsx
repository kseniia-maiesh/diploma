import React from 'react';
import { Card, Input, Select, Button, Space, Row, Col, Typography } from 'antd';
import {
  ReloadOutlined,
  SearchOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { ReactCountryFlag } from 'react-country-flag';
import { regions } from '../../../constants/constants';
import { DetailFilterProps } from '../../../types/types';
import './DetailFilter.css';

const { Search } = Input;
const { Text } = Typography;

const DetailFilter: React.FC<DetailFilterProps> = ({
  filters,
  componentTypes,
  statuses,
  onFilterChange,
  onReset,
  theme,
}) => {
  const themeClass = theme === 'dark' ? 'dark' : 'light';

  return (
    <Card className={`detail-filter-card ${themeClass}`}>
      <Space orientation='vertical' size='large' className='w-100'>
        <div>
          <Space align='center' style={{ marginBottom: 12 }}>
            <SearchOutlined className={`filter-section-icon ${themeClass}`} />
            <Text strong className={`filter-section-title ${themeClass}`}>
              Search Details
            </Text>
          </Space>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Search
                placeholder='Search by name...'
                value={filters.name}
                onChange={(e) => onFilterChange({ name: e.target.value })}
                allowClear
                size='large'
              />
            </Col>

            <Col xs={24} md={12}>
              <Search
                placeholder='Search by description...'
                value={filters.description}
                onChange={(e) =>
                  onFilterChange({ description: e.target.value })
                }
                allowClear
                size='large'
              />
            </Col>
          </Row>
        </div>

        <div>
          <Space align='center' style={{ marginBottom: 12 }}>
            <FilterOutlined className={`filter-section-icon ${themeClass}`} />
            <Text strong className={`filter-section-title ${themeClass}`}>
              Filter Options
            </Text>
          </Space>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Select
                placeholder='Select type'
                value={filters.type}
                onChange={(value) => onFilterChange({ type: value })}
                allowClear
                size='large'
                className='w-100'
                options={componentTypes.map((type) => ({
                  label: type.name,
                  value: type.id,
                }))}
              />
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Select
                placeholder='Select status'
                value={filters.status}
                onChange={(value) => onFilterChange({ status: value })}
                allowClear
                size='large'
                className='w-100'
                options={statuses.map((status) => ({
                  label: status.name,
                  value: status.id,
                }))}
              />
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Select
                placeholder='Select country'
                value={filters.origin_country}
                onChange={(name) => onFilterChange({ origin_country: name })}
                allowClear
                size='large'
                className='w-100'
                options={regions.map((country) => ({
                  value: country.name,
                  label: (
                    <Space>
                      <ReactCountryFlag
                        countryCode={country.value}
                        svg
                        style={{ width: '1.2em', height: '1.2em' }}
                      />
                      {country.name}
                    </Space>
                  ),
                }))}
              />
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Button
                icon={<ReloadOutlined />}
                onClick={onReset}
                size='large'
                block
                className={`filter-reset-button ${themeClass}`}
              >
                Reset Filters
              </Button>
            </Col>
          </Row>
        </div>
      </Space>
    </Card>
  );
};

export default DetailFilter;
