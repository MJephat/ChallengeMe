import { fetchSuccessfulPayments } from "../services/paymentService";
import { useQuery } from "@tanstack/react-query";

export const useSuccessfulPayments = () => {
  return useQuery({
    queryKey: ["successful-payments"],
    queryFn: fetchSuccessfulPayments,
    refetchInterval: 10000, // auto refresh every 10s (optional)
  });
};
