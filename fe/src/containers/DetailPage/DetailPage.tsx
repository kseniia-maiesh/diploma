import React, { useEffect, useReducer, useState, useMemo } from 'react';
import {
  Space,
  Spin,
  Alert,
  Button,
  Empty,
  Pagination,
  message,
  ConfigProvider,
  theme as antdTheme,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { appReducer, initialState } from '../../state/reducer';
import {
  loadDetails,
  loadDetailTypes,
  loadStatuses,
  setFilter,
  resetFilters,
  setPage,
  createDetail,
  deleteComponent,
  toggleTheme,
} from '../../state/actions';
import DetailList from '../../components/DetailPage/DetailList/DetailList';
import DetailFilter from '../../components/DetailPage/DetailFilter/DetailFilter';
import { FilterState, DetailFormData } from '../../types/types';
import DetailModal from '../../components/DetailPage/DetailModal/DetailModal';
import DetailHeader from '../../components/DetailPage/Header/Header';
import './DetailPage.css';

const DetailPage: React.FC = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const themeClass = state.theme === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    loadDetails(dispatch, state.pagination.currentPage, state.filters);
    loadDetailTypes(dispatch);
    loadStatuses(dispatch);
  }, []);

  useEffect(() => {
    loadDetails(dispatch, state.pagination.currentPage, state.filters);
  }, [state.pagination.currentPage, state.filters]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [state.pagination.currentPage]);

  const themeConfig = useMemo(
    () => ({
      algorithm:
        state.theme === 'dark'
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
      token: {
        colorPrimary: '#1890ff',
        borderRadius: 8,
        colorText: state.theme === 'dark' ? '#ffffff' : '#000000',
        colorTextSecondary: state.theme === 'dark' ? '#bfbfbf' : '#595959',
      },
    }),
    [state.theme],
  );

  const ui = useMemo(() => {
    const showDetails = !state.loading && !state.error && state.components.length > 0;
    const showEmpty = !state.loading && !state.error && state.components.length === 0;

    const resultsRange = {
      start: (state.pagination.currentPage - 1) * state.pagination.pageSize + 1,
      end: Math.min(
        state.pagination.currentPage * state.pagination.pageSize,
        state.pagination.count,
      ),
    };

    return { showDetails, showEmpty, resultsRange };
  }, [state]);

  const handleRetry = () => loadDetails(dispatch, state.pagination.currentPage, state.filters);
  const handleThemeToggle = () => toggleTheme(dispatch);
  const handleAddDetail = () => setIsModalOpen(true);
  const handleResetFilters = () => resetFilters(dispatch);
  const handlePageChange = (page: number) => setPage(dispatch, page);
  const handleFilterChange = (filters: Partial<FilterState>) => setFilter(dispatch, filters);

  const handleModalOk = async (formData: DetailFormData) => {
    const result = await createDetail(dispatch, formData);
    if (result.success) {
      message.success('Detail created successfully!');
      setIsModalOpen(false);
      loadDetails(dispatch, 1, state.filters);
    } else {
      message.error(result.error || 'Failed to create component');
    }
  };

  const handleDelete = async (id: number) => {
    const result = await deleteComponent(dispatch, id);
    if (result.success) {
      message.success('Component deleted successfully!');
      if (state.components.length === 1 && state.pagination.currentPage > 1) {
        setPage(dispatch, state.pagination.currentPage - 1);
      } else {
        loadDetails(dispatch, state.pagination.currentPage, state.filters);
      }
    } else {
      message.error(result.error || 'Failed to delete component');
    }
  };

  const renderLoading = () => (
    <div className='detail-page-loading'>
      <Spin size='large' description='Loading...' /> 
    </div>
  );

  const renderError = () => (
    <Alert
      message='Error'
      description={state.error}
      type='error'
      showIcon
      action={
        <Button size='small' onClick={handleRetry}>
          Retry
        </Button>
      }
    />
  );

  const renderEmpty = () => (
    <Empty
      description='No components available'
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    >
      <Button type='primary' icon={<PlusOutlined />} onClick={handleAddDetail}>
        Create First Detail
      </Button>
    </Empty>
  );

  const renderDetailsList = () => (
    <>
      <div className={`detail-page-results-info ${themeClass}`}>
        Showing {ui.resultsRange.start} - {ui.resultsRange.end} of{' '}
        {state.pagination.count} components
      </div>

      <div className='detail-page-grid'>
        {state.components.map((component) => (
          <DetailList
            key={component.id}
            {...component}
            theme={state.theme}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {state.pagination.totalPages > 1 && (
        <div className='detail-page-pagination'>
          <Pagination
            current={state.pagination.currentPage}
            total={state.pagination.count}
            pageSize={state.pagination.pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          />
        </div>
      )}
    </>
  );

  return (
    <ConfigProvider theme={themeConfig}>
      <div className={`detail-page-container ${themeClass}`}>
        <Space orientation='vertical' size='large' className='w-100'>
          <DetailHeader
            theme={state.theme}
            onToggleTheme={handleThemeToggle}
            onAdd={handleAddDetail}
          />

          <DetailFilter
            filters={state.filters}
            componentTypes={state.componentTypes}
            statuses={state.statuses}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            theme={state.theme}
          />

          {state.loading && renderLoading()}
          {state.error && renderError()}
          {ui.showEmpty && renderEmpty()}
          {ui.showDetails && renderDetailsList()}
        </Space>

        <DetailModal
          open={isModalOpen}
          onOk={handleModalOk}
          onCancel={() => setIsModalOpen(false)}
          componentTypes={state.componentTypes}
          statuses={state.statuses}
        />
      </div>
    </ConfigProvider>
  );
};

export default DetailPage;
