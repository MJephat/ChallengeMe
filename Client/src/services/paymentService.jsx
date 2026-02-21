import { axiosInstance } from "../Contexts/axios";


export const fetchSuccessfulPayments = async () => {
  const { data } = await axiosInstance.get("/payments/success");
  return data;
};