import { Dispatch } from 'react';
import { AppAction, DetailFormData, FilterState } from '../types/types';
import { api } from '../services/api';

export const loadDetails = async (
  dispatch: Dispatch<AppAction>,
  page: number = 1,
  filters: FilterState,
) => {
  try {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    const params = new URLSearchParams();
    params.append('page', page.toString());

    if (filters.name) params.append('name', filters.name);
    if (filters.description) params.append('description', filters.description);
    if (filters.type) params.append('type', filters.type.toString());
    if (filters.status) params.append('status', filters.status.toString());
    if (filters.origin_country) params.append('origin_country', filters.origin_country);
    if (filters.source) params.append('source', filters.source);

    const response = await api.get(`/api/components/?${params.toString()}`);

    dispatch({
      type: 'SET_COMPONENTS',
      payload: {
        results: response.data.results || [],
        count: response.data.count || 0,
        next: response.data.next || null,
        previous: response.data.previous || null,
      },
    });
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: 'Failed to load components' });
    console.error('Error loading components:', error);
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false });
  }
};

export const loadDetailTypes = async (dispatch: Dispatch<AppAction>) => {
  try {
    const response = await api.get('/api/component-types/');
    const types = response.data.results || response.data;
    dispatch({ type: 'SET_COMPONENT_TYPES', payload: types });
  } catch (error) {
    console.error('Error loading component types:', error);
  }
};

export const loadStatuses = async (dispatch: Dispatch<AppAction>) => {
  try {
    const response = await api.get('/api/statuses/');
    const statuses = response.data.results || response.data;
    dispatch({ type: 'SET_STATUSES', payload: statuses });
  } catch (error) {
    console.error('Error loading statuses:', error);
  }
};

export const loadDetailStats = async (dispatch: Dispatch<AppAction>) => {
  try {
    const response = await api.get('/api/components/stats_by_country/');
    const types = response.data.results || response.data;
    dispatch({ type: 'SET_COMPONENT_STATS', payload: types });
  } catch (error) {
    console.error('Error loading component types:', error);
  }
};

export const setFilter = (
  dispatch: Dispatch<AppAction>,
  filters: Partial<FilterState>,
) => {
  dispatch({ type: 'SET_FILTER', payload: filters });
};

export const resetFilters = (dispatch: Dispatch<AppAction>) => {
  dispatch({ type: 'RESET_FILTERS' });
};

export const setPage = (dispatch: Dispatch<AppAction>, page: number) => {
  dispatch({ type: 'SET_PAGE', payload: page });
};

export const createDetail = async (
  dispatch: Dispatch<AppAction>,
  formData: DetailFormData,
) => {
  try {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    const response = await api.post('/api/components/', formData);
    dispatch({ type: 'ADD_COMPONENT', payload: response.data });

    return { success: true, data: response.data };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'Failed to create component';
    dispatch({ type: 'SET_ERROR', payload: errorMessage });
    console.error('Error creating component:', error);
    return { success: false, error: errorMessage };
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false });
  }
};

export const updateDetail = async (
  dispatch: Dispatch<AppAction>,
  id: number,
  formData: DetailFormData,
) => {
  try {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    const response = await api.patch(`/api/components/${id}/`, formData);

    dispatch({ type: 'UPDATE_COMPONENT', payload: response.data });

    return { success: true, data: response.data };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'Failed to update component';

    dispatch({ type: 'SET_ERROR', payload: errorMessage });
    console.error('Error updating component:', error);

    return { success: false, error: errorMessage };
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false });
  }
};

export const deleteComponent = async (
  dispatch: Dispatch<AppAction>,
  componentId: number,
) => {
  try {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    await api.delete(`/api/components/${componentId}/`);
    dispatch({ type: 'DELETE_COMPONENT', payload: componentId });

    return { success: true };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'Failed to delete component';
    dispatch({ type: 'SET_ERROR', payload: errorMessage });
    console.error('Error deleting component:', error);
    return { success: false, error: errorMessage };
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false });
  }
};

export const toggleTheme = (dispatch: Dispatch<AppAction>) => {
  dispatch({ type: 'TOGGLE_THEME' });
};
