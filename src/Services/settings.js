import api from "./putApi";

export const createPlan = async (data) => {
    const res = await api.post('/api/Plan/Create', data);
    console.log(res);
    return res.data;
}