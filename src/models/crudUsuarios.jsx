import axios from "axios";
import { API_URL_USERS } from "../api/conexiones";

export async function MostrarUsuarioXIdSupabase(p) {
  console.log(p.id_auth_supabase)
  const response = await axios.get(`${API_URL_USERS}/${p.id_auth_supabase}`,{
    headers:{
      'Authorization':`Bearer ${p.auth_token}`
    }
  });
  return response.data;
}
