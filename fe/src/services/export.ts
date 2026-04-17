import { api } from './api';

export const downloadFile = async (url: string, filename: string) => {
  const response = await api.get(url, {
    responseType: 'blob',
  });

  const blob = new Blob([response.data]);
  const link = document.createElement('a');

  link.href = window.URL.createObjectURL(blob);
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const exportOneComponent = (id: number, format: 'csv' | 'json') => {
  return downloadFile(
    `/api/components/${id}/export_one/?format=${format}`,
    `component_${id}.${format}`
  );
};
