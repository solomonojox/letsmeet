import api from "./putApi";

export const initiateResetPassword = async (data) => {
    const res = await api.post('/api/User/InitiateResetPassword', data);
    console.log(res);
    return res.data;
}

export const resetPassword = async (data) => {
    const res = await api.post('/api/User/ResetPassword', data);
    console.log(res);
    return res.data;
}