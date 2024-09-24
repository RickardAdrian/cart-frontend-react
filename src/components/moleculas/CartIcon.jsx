import { Icon } from "@iconify/react/dist/iconify.js";
import styled from "styled-components";
import { useCartVentasStore } from "../../store/CartVentasStore";
export function CartIcon({ setState }) {
  const { productoCount } = useCartVentasStore();
  return (
    <Container onClick={setState}>
      <section className="contentIcon">
        <Icon className="icono" icon="emojione:shopping-cart" />
        <section className="contentContador">
          <span>{productoCount}</span>
        </section>
      </section>
    </Container>
  );
}
const Container = styled.div`
  position: absolute;
  right: 20px;
  font-size: 18px;
  cursor: pointer;
  .contentIcon {
    position: relative;
    .icono {
      font-size: 30px;
    }
    .contentContador {
      width: 8px;
      height: 8px;
      padding: 10px;
      background-color: #e01e20;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-weight: 700;
      position: absolute;
      margin: 0;
      top: 5px;
      left: 20px;
      span {
        font-size: 14px;
      }
    }
  }
`;
