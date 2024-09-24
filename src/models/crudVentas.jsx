import axios from "axios";
import { API_URL_CART } from "../api/conexiones";

export async function InsertarVenta(p) {

  console.log(p)
  const response = await axios.post(
    `${API_URL_CART}/`,
    { id_usuario: p.id_usuario, estado: "pendiente", total: p.total },
    {
      headers: {
        Authorization: `Bearer ${p.auth_token}`,
      },
    }
  );
  console.log(response.data)
  return response.data;
}
export async function InsertarDetalleVenta(p) {
  try {
    for (const item of p.items) {
      const response = await axios.post(
        `${API_URL_CART}/item/${p.id_usuario}`,
        {
          id_producto: item.id_producto,
          descripcion: item.descripcion,
          precio_venta: item.precio_venta,
          cantidad: item.cantidad,
          total: item.total,
        },
        {
          headers: {
            Authorization: `Bearer ${p.auth_token}`, // Asegúrate de enviar el token de autenticación
          },
        }
      );

      console.log("Detalle de venta creado:", response.data);
    }
  } catch (error) {
    console.error("Error al enviar detalle de venta:", error);
  }

}

export async function MostrarVentaXIduser(p) {
  
  const response = await axios.get(`${API_URL_CART}/${p.id_usuario}`,{
    headers:{
      'Authorization':`Bearer ${p.auth_token}`
    }
  });
  return response.data;
}