import React, { useState } from "react";
import styled from "styled-components";
import { useCartVentasStore } from "../../store/CartVentasStore";
import { Btn1 } from "../moleculas/Btn1";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePaypalStore } from "../../store/PaypalStore";
import { useUsuariosStore } from "../../store/UsuariosStore";
import { useAuthStore } from "../../store/AuthStore";
import { useMutation } from "@tanstack/react-query";
import { useVentasStore } from "../../store/VentasStore";
// Sample Data
export const ShoppingCart = ({ setState }) => {
  const { items, resetState, total } = useCartVentasStore();
  const { crearOrdenPaypal } = usePaypalStore();
  const { insertarVentas, insertarDetalleVentas, dataventas } =
    useVentasStore();
  const { token } = useAuthStore();
  const { datausuarios } = useUsuariosStore();
  const mutation = useMutation({
    mutationKey: ["crearOrdenPaypal", items, total], // Identificador único para la mutación
    mutationFn: async () => {
      const p = {
        items: items,
        total: total,
        auth_token: token,
      };
      console.log(items);
      const response = await crearOrdenPaypal(p);
      return response;
    },
    onSuccess: async (response) => {
      console.log("Orden creada exitosamente:", response?.data.redirectUrl);
      const pventas = {
        id_usuario: datausuarios?.id,
        total: total,
        auth_token: token,
      };
      const pdv = {
        items: items,
        auth_token: token,
        id_usuario: datausuarios?.id,
      };
      console.log(pventas);
      if (response?.data.redirectUrl) {
        console.log("holi");
        const responseVenta = await insertarVentas(pventas);
        console.log(responseVenta);

        await insertarDetalleVentas(pdv);
        window.location.href = response?.data.redirectUrl;
       
      }
    },
    onError: (error) => {
      console.error("Error al crear la orden:", error);
    },
  });

  const handleCrearOrden = () => {
    mutation.mutate();
  };
  return (
    <CartContainer>
      <ContentPage>
        <BtnCerrar onClick={setState}>X</BtnCerrar>
        <Btn1 titulo="Limpiar" funcion={resetState} />
        {items.length == 0 && <span>sin productos</span>}
        {items.map((item) => (
          <CartItem key={item.id}>
            <ItemDetails>
              <ItemImage src={item.imagen} alt={item.descripcion} />
              <div>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>${item.precio_venta}</ItemPrice>
              </div>
            </ItemDetails>
            <ItemQuantity>
              <QuantityButton onClick={() => incrementQuantity(item.id)}>
                +
              </QuantityButton>
              <span>{item.cantidad}</span>
              <QuantityButton onClick={() => decrementQuantity(item.id)}>
                -
              </QuantityButton>
            </ItemQuantity>
            <button onClick={() => removeItem(item.id)}>x</button>
          </CartItem>
        ))}
      </ContentPage>
      <Footer>
        <span>
          Subtotal: <strong>${total}</strong>
        </span>
        <CheckoutButton onClick={handleCrearOrden}>
          <Icon icon="logos:paypal" /> PAGAR PAYPAL
        </CheckoutButton>
      </Footer>
    </CartContainer>
  );
};
const BtnCerrar = styled.span`
  display: block;
  background-color: #241d46;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: #fff;
  padding: 10px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  cursor: pointer;
`;
const ContentPage = styled.section`
  padding: 20px;
`;
const Footer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e01e20;
  position: absolute;
  bottom: 0;
  width: calc(100% - 30px);
  padding: 15px;
  padding-right: 20px;
  color: #fff;
  font-size: 25px;
`;
const CheckoutButton = styled.span`
  padding: 10px;
  background-color: #fff;
  color: #1d1d1d;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #ffc4c4;
  }
`;
// Styled Components
const CartContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 400px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
`;

const ItemDetails = styled.div`
  display: flex;
  align-items: center;
`;

const ItemImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ItemName = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const ItemPrice = styled.span`
  font-size: 18px;
  color: #ff0000;
`;

const ItemQuantity = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  background-color: #ff0000;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  margin: 0 5px;
  border-radius: 4px;
  &:hover {
    background-color: #cc0000;
  }
`;
