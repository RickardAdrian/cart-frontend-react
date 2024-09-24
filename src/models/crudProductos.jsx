import axios from "axios";
import { API_URL_PRODUCTS } from "../api/conexiones";

export async function MostrarProductos() {
  const response = await axios.get(`${API_URL_PRODUCTS}/`);
  return response.data;
}
