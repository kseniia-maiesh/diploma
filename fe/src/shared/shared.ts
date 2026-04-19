import { regions } from '../constants/constants';

export const getCountryCode = (countryName: string) => regions.find((r) => r.name === countryName)?.value;

export const getStatusColor = (status: string): string => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('analyzed') || statusLower.includes('active')) return '#971ac4';
    if (statusLower.includes('identified') || statusLower.includes('active')) return '#52c41a';
    if (statusLower.includes('damaged') || statusLower.includes('error')) return '#f5222d';
    if (statusLower.includes('new')) return '#faad14';
    return '#1890ff';
  };

export const getTypeClass = (type: string): string => {
    const t = type.toLowerCase();

    if (t.includes('microcontroller')) return 'microcontroller';
    if (t.includes('gps')) return 'gps';
    if (t.includes('radio')) return 'radio';
    if (t.includes('sensor')) return 'sensor';
    if (t.includes('power')) return 'power';
    if (t.includes('memory')) return 'memory';
    if (t.includes('antenna')) return 'antenna';
    if (t.includes('camera')) return 'camera';
    if (t.includes('flight')) return 'flight-controller';
    if (t.includes('voltage')) return 'voltage-regulator';
    if (t.includes('battery')) return 'battery';
    if (t.includes('connector')) return 'connector';
    if (t.includes('pcb')) return 'pcb';
    if (t.includes('gyroscope')) return 'gyroscope';
    if (t.includes('accelerometer')) return 'accelerometer';
    if (t.includes('servo')) return 'servo';
    if (t.includes('engine')) return 'engine';

    return 'default';
  };
