import api from "./putApi";

export const getReferrals = async () => {
    const res = await api.get("/api/Referral/GetReferrals");
    return res.data;
};

export const createReferral = async (data) => {
    const res = await api.post("/api/admin/referral-partners/onboard", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
}

export const updateReferral = async (id, data) => {
    const res = await api.put(`/api/admin/referral-partners/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
}

export const getPartnerById = async (partnerId) => {
    const res = await api.get(`/api/admin/referral-partners/${partnerId}`);
    return res.data;
}

export const approvePartner = async (data) => {
    const res = await api.post(`/api/admin/referral-partners/approve`, data);
    return res.data;
}

export const suspendPartner = async (data) => {
    const res = await api.post(`/api/admin/referral-partners/suspend`, data);
    return res.data;
}

export const deletePartner = async (partnerId, data) => {
    const res = await api.post(`/api/admin/referral-partners/${partnerId}`, data);
    return res.data;
}

export const exportData = async (partnerId, formData) => {
    const res = await api.get(`/api/partner/dashboard/${partnerId}/export`, {
        params: formData,
        responseType: 'blob',
        headers: {
            // Remove Content-Type header for GET requests - it's not needed
            // 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            // Add auth headers if needed
            // 'Authorization': `Bearer ${token}`
        }
    });
    return res;
}