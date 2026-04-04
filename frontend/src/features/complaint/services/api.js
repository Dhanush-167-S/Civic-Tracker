import { api } from "@/lib/axios";

export const createComplaint = async (data) => {
  const res = await api.post("/complaint/register", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const getAllComplaints = async () => {
  const res = await api.get("/complaint/");
  return res.data;
};

export const getComplaintById = async (id) => {
  const res = await api.get(`/complaint/${id}`);
  return res.data;
};

export const upVoteComplaint = async (id) => {
  const res = await api.post(`/complaint/upvote/${id}`);
  return res.data;
};
