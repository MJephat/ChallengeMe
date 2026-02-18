export const normalizePhone = (phone) => {
  if (phone.startsWith("0")) return "254" + phone.slice(1);
  return phone;
};
