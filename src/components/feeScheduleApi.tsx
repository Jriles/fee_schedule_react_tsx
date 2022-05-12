import { Configuration, DefaultApi } from 'fee_schedule_typescript_axios_client';
import { BaseAPI } from 'fee_schedule_typescript_axios_client/base';

const feeScheduleConfig = new Configuration();
export const feeScheduleApi = new DefaultApi(feeScheduleConfig);