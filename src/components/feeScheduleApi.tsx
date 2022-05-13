import { DefaultApi } from './api/api';
import { Configuration } from './api';

const feeScheduleConfig = new Configuration();
export const feeScheduleApi = new DefaultApi(feeScheduleConfig);