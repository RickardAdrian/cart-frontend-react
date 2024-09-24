import styled from "styled-components";
import { ShoppingCart } from "./ShoppingCart";
export function CartView({setState}) {
  return (
    <Container>
      <ShoppingCart setState={setState}/>
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  position: fixed;
  background-color: rgba(172, 91, 91, 0.6);
  width: 100vw;
  z-index: 1;
  justify-content: end;
  display: flex;
 
`;
