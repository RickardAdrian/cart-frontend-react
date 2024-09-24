import styled from "styled-components";
import { InputText } from "../organismos/formularios/InputText";
import { useForm } from "react-hook-form";
import {Btn1, useAuthStore} from "../../index"
import tiendalogo from "../../assets/gty.png"
import { useState } from "react";
export function CrearCuenta({setState}) {

  const { signCreateEmail } = useAuthStore();
  const [stateInicio, setStateInicio] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm();
  async function iniciar(data) {
    const response = await signCreateEmail({
      email: data.correo,
      password: data.pass,
    });
    if (response) {
        setState()
    } else {
      setStateInicio(!stateInicio);
    }
  }
  return (
    <Container>
      <img src={tiendalogo} style={{"width":80}}/>
        <span>CREAR CUENTA</span>
      <section >
        
          <form onSubmit={handleSubmit(iniciar)}>
            <InputText >
              <input
                className="form__field"
                onChange={(e) => setCorreo(e.target.value)}
                type="text"
                placeholder="email"
                {...register("correo", {
                  required: true,
                })}
              />
              <label className="form__label">email</label>
              {errors.correo?.type === "required" && <p>Campo requerido</p>}
            </InputText>
            <InputText >
              <input
                className="form__field"
                onChange={(e) => setPass(e.target.value)}
                type="password"
                placeholder="contraseña"
                {...register("pass", {
                  required: true,
                })}
              />
              <label className="form__label">pass</label>
              {errors.pass?.type === "required" && <p>Campo requerido</p>}
            </InputText>
           <Btn1 titulo="Registrar"/>
         
          </form>
          <Btn1 titulo="volver" funcion={setState}/>
      </section>
       
          
    </Container>
  );
}
const Container = styled.div`
display:flex;
justify-content:center;
align-items:center;
margin:0;
height:100vh;
flex-direction:column;
section{
    gap:10px;
    display:flex;
    flex-direction:column;
  }
form{
  display:flex;
  flex-direction:column;
  gap:20px;
}
`;
