import axios from "axios";
import { API_BASE_URL } from "./config";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, {
      email,
      password,
    });
    console.log("Login Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login Failed:", error.response?.data || error.message);
    throw error;
  }
};
