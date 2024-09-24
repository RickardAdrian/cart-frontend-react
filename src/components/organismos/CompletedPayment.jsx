import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { usePaypalStore } from "../../store/PaypalStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { useVentasStore } from "../../store/VentasStore";
import { Btn1, useAuthStore, useCartVentasStore, useUsuariosStore } from "../..";
export const CompletePayment = () => {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const PayerID = searchParams.get("PayerID");
  const TokenPaypal = searchParams.get("token");
  const { executeOrdenPaypal } = usePaypalStore();
  const { dataventas, idventa, mostrarVentaXIduser } = useVentasStore();
  const {resetState} = useCartVentasStore()
  const { token } = useAuthStore();
  const { datausuarios } = useUsuariosStore();
  const navigation = useNavigate();
  const cerrar = () => {
    navigation("/");
  };

  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ["mostrar ventas", datausuarios?.id],
  //   queryFn: () =>
  //     mostrarVentaXIduser({ id_usuario: datausuarios?.id, auth_token: token }),
  //   enabled: !!datausuarios,
  // });

  const mutation = useMutation({
    mutationKey: ["executeOrdenPaypal"],
    mutationFn: async () => {
      const p = {
        id_venta: dataventas?.id,
        total: dataventas?.total,
        auth_token: token,
        paymentId: paymentId,
        PayerID: PayerID,
        token_paypal: TokenPaypal,
      };

      console.log(p);
      const response = await executeOrdenPaypal(p);
      return response;
    },
    onSuccess: (response) => {
      console.log("Pago ejecutado con éxito:", response.data);
      resetState(); // Resetea el estado del carrito después de la orden
      // Redirigir al usuario a una página de éxito o mostrar un mensaje
    },
    onError: (error) => {
      console.error("Error al ejecutar el pago:", error.message);
      // Manejo de errores aquí
    },
  });

  useEffect(() => {
    if (paymentId && PayerID) {
      mutation.mutate();
    }
  }, [paymentId, PayerID]);

  return (
    <Container>
      <section>
        {mutation.isLoading && <p>Completando pago...</p>}
        
        {mutation.isError && (
          <div>
            <p>Error al completar el pago. {mutation.error.message}</p>
            <Btn1 titulo="Aceptar" funcion={cerrar} />
          </div>
        )}
        {mutation.data && <p>Pago completado con éxito.</p>}
        {mutation.data && <Btn1 titulo="Aceptar" funcion={cerrar} />}
      </section>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: auto;
`;
