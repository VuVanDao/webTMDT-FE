export const EMAIL_RULE = /^\S+@\S+\.\S+$/;
export const EMAIL_RULE_MESSAGE =
  "Email is invalid. (example@trungquandev.com)";
export const PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\W]{8,256}$/;
export const PASSWORD_RULE_MESSAGE =
  "Password must include at least 1 letter, a number, and at least 8 characters.";
export const PASSWORD_CONFIRMATION_MESSAGE =
  "Password Confirmation does not match!";
export const apiRoot =
  process.env.BUILD_MODE === "dev" ? "http://localhost:8017" : "";
// export const apiRoot = "http://localhost:8017";
// let api_Root = "";
// if (process.env.BUILD_MODE === "dev") {
//   api_Root = "http://localhost:8017";
// } else {
//   api_Root = "https://be-5kst.onrender.com";
// }
console.log(process.env);
export const PHONE_RULE = /^0[0-9]{9}$/;
export const PHONE_RULE_MESSAGE = "Plz supply your phoneNumber";
// export const apiRoot = api_Root;
