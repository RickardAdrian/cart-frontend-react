import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { useAuthStore, useUsuariosStore } from "..";
export function Layout({ children }) {
const {datauserAuth,token} = useAuthStore()
  const {mostrarUserXIdSupabase} = useUsuariosStore()
 const {isLoading}= useQuery({
    queryKey: ["mostrar usuario",datauserAuth?.id],
    queryFn:()=> mostrarUserXIdSupabase({id_auth_supabase: datauserAuth?.id,auth_token:token}),
  });
if(isLoading){
  return <span>cargando usuarios...</span>
}
  return (
    <Container>
      <Containerbody>{children}</Containerbody>
    </Container>
  );
}
const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  transition: 0.1s ease-in-out;
  color: ${({ theme }) => theme.text};
`;
const Containerbody = styled.section`
  grid-column: 1;
  width: 100%;
`;
