import { AppState, AppAction } from '../types/types'

export const initialState: AppState = {
  components: [],
  componentTypes: [],
  statuses: [],
  filters: {
    name: '',
    description: '',
    type: null,
    status: null,
    source: '',
  },
  pagination: {
    count: 0,
    next: null,
    previous: null,
    currentPage: 1,
    totalPages: 1,
    pageSize: 12,
  },
  loading: false,
  error: null,
  theme: 'light',
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_COMPONENTS':
      const totalPages = Math.ceil(action.payload.count / state.pagination.pageSize)
      return {
        ...state,
        components: action.payload.results,
        pagination: {
          ...state.pagination,
          count: action.payload.count,
          next: action.payload.next,
          previous: action.payload.previous,
          totalPages,
        },
      }

    case 'SET_COMPONENT_TYPES':
      return {
        ...state,
        componentTypes: action.payload,
      }

    case 'SET_STATUSES':
      return {
        ...state,
        statuses: action.payload,
      }

    case 'SET_FILTER':
      const newFilters = {
        ...state.filters,
        ...action.payload,
      }
      return {
        ...state,
        filters: newFilters,
        pagination: {
          ...state.pagination,
          currentPage: 1,
        },
      }

    case 'RESET_FILTERS':
      return {
        ...state,
        filters: initialState.filters,
        pagination: {
          ...state.pagination,
          currentPage: 1,
        },
      }

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      }

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      }

    case 'SET_PAGE':
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: action.payload,
        },
      }

    case 'ADD_COMPONENT':
      return {
        ...state,
        components: [action.payload, ...state.components],
        pagination: {
          ...state.pagination,
          count: state.pagination.count + 1,
        },
      }

    case 'DELETE_COMPONENT':
      return {
        ...state,
        components: state.components.filter(component => component.id !== action.payload),
        pagination: {
          ...state.pagination,
          count: state.pagination.count - 1,
        },
      }

    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      }

    default:
      return state
  }
}
