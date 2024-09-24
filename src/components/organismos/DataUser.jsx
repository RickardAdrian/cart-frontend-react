import styled from "styled-components";
import {useAuthStore} from "../../store/AuthStore"
import { Btn1 } from "../..";
export function DataUser() {
  const {signout,datauserAuth} = useAuthStore()

  return (
    <Container>
      <span>hola!!! {datauserAuth.email}</span>
      <Btn1 titulo="Cerrar sesion" funcion={signout}/>
    </Container>
  );
}
const Container = styled.div`
display:flex;
align-items :center;
gap:10px;
`;
