import api from "./putApi";

export const createPlan = async (data) => {
    const res = await api.post('/api/Plan/Create', data);
    // console.log(res);
    return res.data;
}

export const getPlans = async () => {
    const res = await api.get('/api/Plan/Query');
    // console.log(res.data.data);
    return res.data.data;
}

export const editPlan = async (data) => {
    const res = await api.put(`/api/Plan/Update/${data.id}`, data);
    // console.log(res);
    return res.data;
}

export const deletePlan = async (id) => {
    const res = await api.delete(`/api/Plan/Delete/${id}`);
    // console.log(res);
    return res.data;
}