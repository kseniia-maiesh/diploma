export interface DetailListProps {
  id: number
  name: string
  description: string
  type: number
  type_name: string
  status: number
  status_name: string
  source: string
  origin_country: string
  image_url: string
  theme: 'light' | 'dark'
  onDelete?: (id: number) => void
  onEdit?: (component: DetailItem) => void
}

export interface Type {
  id: number
  name: string
}

export interface Status {
  id: number
  name: string
}

export interface DetailItem {
  id: number
  name: string
  description: string
  type: number
  type_name: string
  status: number
  status_name: string
  source: string
  origin_country: string
  image_url: string
}

export interface FilterState {
  name: string
  description: string
  type: number | null
  status: number | null
  origin_country: string
  source: string
}

export interface PaginationInfo {
  count: number
  next: string | null
  previous: string | null
  currentPage: number
  totalPages: number
  pageSize: number
}

export interface AppState {
  components: DetailItem[]
  componentTypes: Type[]
  statuses: Status[]
  filters: FilterState
  pagination: PaginationInfo
  loading: boolean
  error: string | null
  theme: 'light' | 'dark'
}

export interface DetailFormData {
  name: string
  description: string
  type: number | null
  status: number | null
  source: string
  origin_country: string
  image_url: string
}

export interface DetailModalProps {
  open: boolean;
  onOk: (values: DetailFormData) => void;
  onCancel: () => void;
  componentTypes: any[];
  statuses: any[];
  initialData?: DetailItem | null;
}

export interface DetailFilterProps {
  filters: FilterState;
  componentTypes: Type[];
  statuses: Status[];
  onFilterChange: (filters: Partial<FilterState>) => void;
  onReset: () => void;
  theme: 'light' | 'dark';
}

export type AppAction =
  | { type: 'SET_COMPONENTS'; payload: { results: DetailItem[]; count: number; next: string | null; previous: string | null } }
  | { type: 'SET_COMPONENT_TYPES'; payload: Type[] }
  | { type: 'SET_STATUSES'; payload: Status[] }
  | { type: 'SET_FILTER'; payload: Partial<FilterState> }
  | { type: 'RESET_FILTERS' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'ADD_COMPONENT'; payload: DetailItem }
  | { type: 'DELETE_COMPONENT'; payload: number }
  | { type: 'TOGGLE_THEME' }
  | { type: 'UPDATE_COMPONENT'; payload: DetailItem }
