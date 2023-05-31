import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { register as registerUser } from "../../redux/AuthActions";
import { Box, Modal, Typography } from "@mui/material";
import style from "./ModalRegister.module.css";
import FormLogin from "../FormLogin/FormLogin";
import ModalLogin from "../ModalLogin/ModalLogin";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import FB from "../FormLogin/svg/FB";
import Gmail from "../FormLogin/svg/Gmail";
const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  //   maxWidth: 400,
  bgcolor: "background.paper",
  boxShadow: " 0px 1px 5px rgba(0, 0, 0, 0.40)",
  padding: "2vh",
  borderRadius: "1vh",
};

export default function ModalRegistroFamilia({ open, setOpen }) {
  const [OpenLogin, setOpenLogin] = useState(false);
  const [seePassword, setseePassword] = useState(false);
  const handlerOpenLogin = () => {
    setOpenLogin(true);
  };
  const ToggleSeePass = () => {
    setseePassword(!seePassword);
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      mail: "",
      lastname: "",
      phone: "",
      password: "",
    },
    mode: "onChange",
  });

  const OnSubmit = (user) => {
    const data = {
      apellidos: user.lastname,
      email: user.mail,
      nombre: user.name,
      password: user.password,
      telefono: user.phone,
    };

    dispatch(registerUser(data));
    handleClose();
  };
  const handleClose = () => setOpen(false);
  return (
    <>
      <Modal
        sx={{ display: "flex" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          {OpenLogin === false && (
            <form
              onSubmit={handleSubmit(OnSubmit)}
              className={style.formLayout}
            >
              <div
                style={{
                  width: "100%",
                  padding: "1vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "700",
                    fontFamily: "Poppins",
                    color: "#0061DF",
                  }}
                >
                  Completa tus datos
                </Typography>
              </div>

              <div className={style.form}>
                <div className={style.divInputs}>
                  <label className={style.label}>Nombre</label>
                  <input
                    placeholder="Introduzca su nombre "
                    {...register("name", {
                      required: true,

                      maxLength: 100,
                    })}
                    className={style.input}
                  />

                  {errors.name && (
                    <p className={style.p}>Introduzca su nombre.</p>
                  )}
                  <label className={style.label}>Apellido</label>
                  <input
                    placeholder="Introduzca su apellido "
                    {...register("lastname", {
                      required: true,
                      maxLength: 100,
                    })}
                    className={style.input}
                  />

                  {errors.lastname?.type === "required" && (
                    <p className={style.p}>Introduzca su apellido.</p>
                  )}
                  {errors.lastname?.type === "maxLength" && (
                    <p className={style.p}>Demasiados caracteres.</p>
                  )}
                  <label className={style.label}>Email</label>
                  <input
                    placeholder="Introduzca su correo electronico "
                    {...register("mail", {
                      required: true,

                      maxLength: 100,
                      pattern: /\S+@\S+\.\S+/,
                    })}
                    className={style.input}
                  />
                  {errors.mail?.type === "required" && (
                    <p className={style.p}>Introduzca su mail.</p>
                  )}
                  {errors.mail?.type === "pattern" && (
                    <p className={style.p}>El formato es examp@sds.com</p>
                  )}
                  {errors.mail?.type === "maxLength" && (
                    <p className={style.p}>Demasiados caracteres.</p>
                  )}
                </div>
                <div className={style.divInputs}>
                  <label className={style.label}>Telefono</label>
                  <input
                    type="number"
                    placeholder="Introduzca numero de telefono"
                    {...register("phone", { required: true })}
                    className={style.input}
                  />
                  {errors.phone && (
                    <p className={style.p}>Introduzca su telefono .</p>
                  )}

                  <label className={style.label}>Contraseña</label>
                  <div className={style.DivPass}>
                    {seePassword === true ? (
                      <BsEye
                        onClick={ToggleSeePass}
                        className={style.Password}
                      />
                    ) : (
                      <BsEyeSlash
                        onClick={ToggleSeePass}
                        className={style.Password}
                      />
                    )}

                    <input
                      placeholder="Contraseña"
                      type={seePassword === true ? "text" : "password"}
                      {...register("password", {
                        required: true,
                        maxLength: 100,
                      })}
                      className={style.input}
                    />
                  </div>
                  {errors.password?.type === "required" && (
                    <p className={style.p}>Campo requerido</p>
                  )}
                </div>
              </div>
              <div className={style.divButton}>
                <button type="submit">REGISTRARSE</button>
              </div>

              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  alignContent: "center",
                  justifyContent: "center",

                  alignItems: "center",
                }}
              >
                <p className="  text-sm">Prefiero iniciar sesion con</p>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "row",
                    alignContent: "center",
                    justifyContent: "center",
                    gap: "1.5vh",
                    padding: "1vh",
                    alignItems: "center",
                  }}
                >
                  <FB />
                  <Gmail />
                </div>
              </div>

              <div className={`${style.divButton}`}>
                <p>Ya tienes cuenta ? </p>
                <div>
                  <p
                    onClick={handlerOpenLogin}
                    style={{ color: "blue", cursor: "pointer" }}
                  >
                    Inicia Sesión{" "}
                  </p>
                </div>
              </div>
            </form>
          )}
          {OpenLogin && (
            <FormLogin
              OpenLogin={OpenLogin}
              setOpenLogin={setOpenLogin}
              //   handlerClose={setOpenLogin}
            />
          )}
        </Box>
      </Modal>
    </>
  );
}
