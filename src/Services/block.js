import api from "./putApi";

// export const createPlan = async (data) => {
//     const res = await api.post('/api/Plan/Create', data);
//     // console.log(res);
//     return res.data;
// }

export const getBlockedDetails = async (userId) => {
    const res = await api.get(`/api/admin/block-analysis/users/${userId}/analysis`);
    // console.log(res.data.data);
    return res.data.data;
}

// export const editPlan = async (data) => {
//     const res = await api.put(`/api/Plan/Update/${data.id}`, data);
//     // console.log(res);
//     return res.data;
// }

// export const deletePlan = async (id) => {
//     const res = await api.delete(`/api/Plan/Delete/${id}`);
//     // console.log(res);
//     return res.data;
// }