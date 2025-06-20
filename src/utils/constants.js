export const EMAIL_RULE = /^\S+@\S+\.\S+$/;
export const EMAIL_RULE_MESSAGE = "Email is invalid. (example@gmail.com)";
export const PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\W]{8,256}$/;
export const PASSWORD_RULE_MESSAGE =
  "Password must include at least 1 letter, a number, and at least 8 characters.";
export const PASSWORD_CONFIRMATION_MESSAGE =
  "Password Confirmation does not match!";
export const apiRoot =
  process.env.BUILD_MODE === "dev"
    ? "http://localhost:8017"
    : "https://webtmdt-be.onrender.com";

console.log(process.env);
export const PHONE_RULE = /^0[0-9]{9}$/;
export const PHONE_RULE_MESSAGE = "Nhập đúng số định dạng số điện thoại";
// export const apiRoot = api_Root;
export const ORDER_STATUS = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
  DELIVERING: "DELIVERING",
  DONE: "DONE",
  REFUND: "REFUND",
};
export const USER_ROLES = {
  CUSTOMER: "customer",
  ADMIN: "admin",
  SHOP_OWNER: "shop_owner",
};
export const SHOP_STATUS = {
  ACCEPT: "accept",
  DENIED: "denied",
  PENDING: "pending",
};
