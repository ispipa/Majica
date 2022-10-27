import React, { useState } from 'react';


import Usuario from '../assets/usu2.jpg';
import LogoUno from '../assets/LogoUno.png'
import LogoDos from '../assets/icono.png'


export const Main = () => {

  const [sign, setSign] = useState(false);
  const Sign_in_btn = () => {
    setSign(true)
  }
  const Sing_up_btn = () => {
    setSign(false)
  }


  return (
      <div>
        <div className={sign ? "container sign-up-mode" : "container"}>
          <div className="forms-container">
            <div className="signin-signup">
              <form action="" className="sign-in-form formulario__login" method="" >
                <img src={LogoDos} className="image" alt="Majica"/>
                <h2 className="title">Iniciar sesion</h2>
                <div className="input-field">
                  {/* <i className="fas fa-user"></i> */}
                  <input name="correo" type="text" placeholder="Email" />
                </div>
                <div className="input-field">
                  {/* <i className="fas fa-lock"></i> */}
                  <input name="clave" type="password" placeholder="Contraseña" />
                </div>
                <input type="submit" value="Iniciar sesion" className="btn solid" />
              </form>

              <form action="" className="sign-up-form formulario__login" method="" encType='' ></form>

              <form action="" className="sign-up-form formulario__login" method="" encType="" >

                <h2 className="title">Registrarse</h2>


                <div className="foto"><img className="preliminar" src={Usuario} id="file" alt='' /></div>
                <input id="file-arch" type="file" encType='multipart/form-data' name="src-file1" aria-label="Archivo" />

                <div className="input-field">
                  <i className="fas fa-user"></i>
                  <input name="nombre" className="nombre" type="text" placeholder="Nombre completo" required />
                </div>
                <div className="input-field">
                  <i className="fas fa-envelope"></i>
                  <input name="correo" type="email" placeholder="Email" />
                </div>
                <div className="input-field">
                  <i className="fas fa-user"></i>
                  <input name="usuario" type="text" placeholder="Nombre de usuario" />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input name="clave" type="password" placeholder="Nueva Contraseña" />
                </div>
                <input type="submit" className="btn" value="Registrarse" />

                <div className="social-media">


                </div>
              </form>
            </div>
            <img src="img/fondo.svg" className={sign ? "image fondo-img-none" : "image fondo-img"} alt='' />
          </div>

          <div className="panels-container">
            <div className="panel left-panel">
              <div className="content">
                <h3>¿Aún no tienes una cuenta?</h3>
                <p>
                  Regístrate para que puedas iniciar sesión
                </p>
                <button className="btn transparent" id="sign-up-btn" onClick={Sign_in_btn}>
                  Registrate
                </button>
              </div>
              <img src={LogoUno} className="image" alt="" />
            </div>
            <div className="panel right-panel">
              <div className="content">
                <h3>¿Ya tienes una cuenta?</h3>
                <p>
                  Inicia sesión para entrar en la página
                </p>
                <button className="btn transparent" id="sign-in-btn" onClick={Sing_up_btn}>
                  Inicia sesion
                </button>
              </div>
              <img src={LogoUno} className="image" alt="" />
            </div>
          </div>
        </div>
      </div>

  )
}
