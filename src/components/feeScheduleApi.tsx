import { DefaultApi } from './api/api';
import { Configuration } from './api';
import { Cookies } from 'react-cookie';

interface ApiProps {
    sessionToken: string;
    userId: string;
}

export default function CreateFeeScheduleApiClient(props:ApiProps) {
    let feeScheduleConfig = new Configuration({
        baseOptions: {
            headers: {
                session_token: props.sessionToken,
                user_id: props.userId
            }
        }
    });
    const feeScheduleApi = new DefaultApi(feeScheduleConfig);
    console.log(feeScheduleApi)
    return feeScheduleApi; 
}