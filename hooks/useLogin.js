import axios from "axios";


export function useLogin() {
  async function login(userEmail, userPassword) {
    const res = await axios.post(
      "http://localhost:5000/login",
      {
        userEmail,
        userPassword,
      },
      { withCredentials: true }
    );

    return res.data;
  }
  return { login };
}
