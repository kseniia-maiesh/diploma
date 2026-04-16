import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterState } from '../types/types';

type Props = {
  filters: FilterState;
  dispatch: React.Dispatch<any>;
  setFilter: (dispatch: any, filters: Partial<FilterState>) => void;
  setPage: (dispatch: any, page: number) => void;
};

export const useFiltersInUrl = ({
  filters,
  dispatch,
  setFilter,
  setPage,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const urlFilters: Partial<FilterState> = {
      name: searchParams.get('name') || '',
      description: searchParams.get('description') || '',
      type: searchParams.get('type')
        ? Number(searchParams.get('type'))
        : null,
      status: searchParams.get('status')
        ? Number(searchParams.get('status'))
        : null,
      origin_country: searchParams.get('origin_country') || undefined,
    };

    setFilter(dispatch, urlFilters);

    const page = searchParams.get('page');
    if (page) setPage(dispatch, Number(page));
  }, []);

  useEffect(() => {
    const params: Record<string, string> = {};

    if (filters.name) params.name = filters.name;
    if (filters.description) params.description = filters.description;
    if (filters.type !== null) params.type = String(filters.type);
    if (filters.status !== null) params.status = String(filters.status);
    if (filters.origin_country) params.origin_country = filters.origin_country;

    setSearchParams(params);
  }, [filters]);
};