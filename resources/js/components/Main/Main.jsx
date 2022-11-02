import React, { useState } from 'react';
import Usuario from '../assets/usu2.jpg';
import Logo from '../assets/Logo.png'
// import LogoMJ from '../assets/LogoMj.png'
// import LogoMJPort from '../assets/LogoMJPortada.png'

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
                      <form
                          action=""
                          className="sign-in-form formulario__login"
                          method=""
                      >
                          <img src={Logo} className="image" alt="Majica" />
                          <h2 className="title">Iniciar sesion</h2>
                          <div className="content-input">
                              <div className="input-field">
                                  {/* <i className="fas fa-user"></i> */}
                                  <input
                                      name="correo"
                                      type="text"
                                      placeholder="Email"
                                  />
                              </div>
                              <div className="input-field">
                                  {/* <i className="fas fa-lock"></i> */}
                                  <input
                                      name="clave"
                                      type="password"
                                      placeholder="Contraseña"
                                  />
                              </div>
                              <div className="btn-register">
                              <input
                                      type=""
                                      value="Crear Cuenta"
                                      className="btn solid"
                                      onClick={Sign_in_btn}
                                      preventDefault=""
                                  />

                                  <input
                                      type="submit"
                                      value="Iniciar sesion"
                                      className="btn solid"
                                  />

                              </div>
                          </div>
                      </form>

                      <form
                          action=""
                          className="sign-up-form formulario__login"
                          method=""
                          encType=""
                      ></form>

                      <form
                          action=""
                          className="sign-up-form formulario__login"
                          method=""
                          encType=""
                      >
                          <h2 className="title">Registrarse</h2>

                          <div className="foto">
                              <img
                                  className="preliminar"
                                  src={Usuario}
                                  id="file"
                                  alt=""
                              />
                          </div>
                          <input
                              id="file-arch"
                              type="file"
                              encType="multipart/form-data"
                              name="src-file1"
                              aria-label="Archivo"
                          />
                          <div className="content-input">
                              <div className="container-inputs">
                                  <div
                                      className="input-field"
                                      style={{ gridArea: "area1" }}
                                  >
                                      <i className="fas fa-user"></i>
                                      <input
                                          name="nombre"
                                          className="nombre"
                                          type="text"
                                          placeholder="Nombre"
                                          required
                                      />
                                  </div>

                                  <div
                                      className="input-field"
                                      style={{ gridArea: "area2" }}
                                  >
                                      <i className="fas fa-user"></i>
                                      <input
                                          name="apellidos"
                                          type="text"
                                          placeholder="Apellidos"
                                          required
                                      />
                                  </div>
                                  <div
                                      className="input-field"
                                      style={{ gridArea: "area3" }}
                                  >
                                      <i className="fas fa-user"></i>
                                      <input
                                          name="telefono"
                                          type="text"
                                          placeholder="Teléfono"
                                          required
                                      />
                                  </div>
                                  <div
                                      className="input-field"
                                      style={{ gridArea: "area4" }}
                                  >
                                      <i className="fas fa-lock"></i>
                                      <input
                                          name="clave"
                                          type="password"
                                          placeholder="Contraseña"
                                      />
                                  </div>
                                  <div
                                      className="input-field"
                                      style={{ gridArea: "area5" }}
                                  >
                                      <i className="fas fa-user"></i>
                                      <input
                                          name="codigo-postal"
                                          type="text"
                                          placeholder="Codigo Postal"
                                          required
                                      />
                                  </div>

                                  <div
                                      className="input-field"
                                      style={{ gridArea: "area6" }}
                                  >
                                      <i className="fas fa-envelope"></i>
                                      <input
                                          name="correo"
                                          type="email"
                                          placeholder="Email"
                                      />
                                  </div>

                                  <div
                                      className="input-field"
                                      style={{ gridArea: "area7" }}
                                  >
                                      <i className="fas fa-user"></i>
                                      <input
                                          name="dirección"
                                          type="text"
                                          placeholder="Dirección"
                                          required
                                      />
                                  </div>
                              </div>

                              <div className="btn-register">
                              <input
                                      type=""
                                      className="btn"
                                      value="Iniciar Sesión"
                                      onClick={Sing_up_btn}
                                  />

                                  <input
                                      type="submit"
                                      className="btn"
                                      value="Registrarse"
                                  />

                              </div>
                          </div>
                          <div className="social-media"></div>
                      </form>
                  </div>
                  <img
                      src="img/fondo.svg"
                      className={
                          sign ? "image fondo-img-none" : "image fondo-img"
                      }
                      alt=""
                  />
              </div>

              <div className="panels-container">
                  <div className="panel left-panel">
                      <div className="content">
                          {/*<img
                            //   src={LogoMJPort}
                              className="LogoPreliminar"
                              alt="logoMajica"
                          />*/}
                          <div className="text-panel">
                              <p>
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit. Neque, accusamus animi
                                  distinctio blanditiis dignissimos doloremque
                                  corrupti ad. Sed, porro accusamus incidunt
                                  odio provident quod rem beatae nobis, quam,
                                  nulla perferendis?
                              </p>

                              <button
                                  className="btn transparent"
                                  id="sign-up-btn"
                                  onClick=""
                              >
                                  Saber mas
                              </button>
                          </div>

                          {/* <h3>¿Aún no tienes una cuenta?</h3>
                <p>
                  Regístrate para que puedas iniciar sesión
                </p>  */}
                          {/* <button className="btn transparent" id="sign-up-btn" onClick={Sign_in_btn}>
                  Registrate
                </button> */}
              </div>
              {/* <img src={Logo} className="image" alt="" /> */}
            </div>
            <div className="panel right-panel">
              <div className="content">
                  {/*<img src={LogoMJPort} className="image-second" alt="Majica" />*/}
            </div>
                      {/* <img src={Logo} className="image" alt="" /> */}
                  </div>
              </div>
          </div>
      </div>
  );
}
