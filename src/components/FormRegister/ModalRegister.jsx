import React, { useState } from "react";
import style from "./ModalRegister.module.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import { MenuItem, toggleButtonClasses, Typography } from "@mui/material";
import Select from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
import { InputLabel } from "@mui/material";
import Button from "@mui/material/Button";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";

import Logo from "../../assets/logoPayment.png";
import FormInscripcion from "../FormInscripcion/FormInscripcion";
import { register as registerUser } from "../../redux/AuthActions";
import FormLogin from "../FormLogin/FormLogin";
import ModalLogin from "../ModalLogin/ModalLogin";
import FB from "../FormLogin/svg/FB";
import Gmail from "../FormLogin/svg/Gmail";
import IconSch from "./svg/IconSch";
import IconUser from "./svg/IconUser";
import ModalRegistroFamilia from "./ModalRegistroFamilia";
const styleDsktop = {
  position: "absolute",
  top: "16%",
  right: "-5%",
  transform: "translate(-50%, -50%)",

  //   maxWidth: 400,
  bgcolor: "background.paper",
  boxShadow: " 0px 1px 5px rgba(0, 0, 0, 0.40)",
  padding: "2vh",
  borderRadius: "1vh",
};
const styleMobile = {
  position: "absolute",
  top: "50%",
  right: "50%",
  transform: "translate(-50%, -50%)",

  //   maxWidth: 400,
  bgcolor: "background.paper",
  boxShadow: " 0px 1px 5px rgba(0, 0, 0, 0.40)",
  padding: "2vh",
  borderRadius: "1vh",
};

export default function ModalRegistro({ open, setOpen }) {
  const { isAuth, success } = useSelector((state) => state.auth);
  const handleClose = () => setOpen(false);
  const [Distrito, setDistrito] = useState(false);
  const [seePassword, setseePassword] = useState(false);
  const [OpenRegistroColegio, setOpenRegistroColegio] = useState(false);
  const [OpenRegistroPadre, setOpenRegistroPadre] = useState(false);
  const [OpenLogin, setOpenLogin] = useState(false);
  const { distrits } = useSelector((state) => state.schools);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  return (
    <>
      <Modal
        sx={{ display: "flex" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleDsktop}>
          {OpenRegistroPadre === false &&
            OpenLogin === false &&
            OpenRegistroColegio === false && (
              <>
                <div
                  style={{
                    display: "flex",
                    gap: "2vh",
                    padding: "1vh",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2vh",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "2vh",
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <IconSch />
                      <Button transparent>
                        {" "}
                        <Link
                          // className={`${style.p} hover-underline-animation`}
                          onClick={handleClose}
                          style={{
                            fontWeight: "600",
                            fontSize: "1.4vh",
                            fontFamily: "Poppins",
                          }}
                          to={"/enroll"}
                        >
                          Colegio
                        </Link>
                      </Button>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "2vh",
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <IconUser />
                      <Button
                        onClick={() => setOpenRegistroPadre(true)}
                        transparent
                        sx={{
                          fontWeight: "600",
                          fontSize: "1.4vh",
                          fontFamily: "Poppins",
                        }}
                      >
                        Padre de Familia
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}

          {OpenRegistroPadre && (
            <ModalRegistroFamilia
              open={OpenRegistroPadre}
              setOpen={setOpenRegistroPadre}
            />
          )}
          {OpenRegistroColegio && OpenLogin === false && (
            <FormInscripcion handlerOpenLogin={setOpenLogin} />
          )}
          <div>
            {OpenLogin === true &&
              OpenRegistroPadre === false &&
              isAuth === false && (
                <FormLogin setOpenLogin={setOpenLogin} OpenLogin={OpenLogin} />
              )}
          </div>
        </Box>

        {/* <div className={style.divMobile}>
          <Box sx={styleDsktop}>
            {OpenRegistroPadre === false &&
              OpenLogin === false &&
              OpenRegistroColegio === false && (
                <>
                  <div
                    style={{
                      display: "flex",
                      gap: "2vh",
                      padding: "1vh",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2vh",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "2vh",
                          width: "100%",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        <IconSch />
                        <Button transparent>
                          {" "}
                          <Link
                            // className={`${style.p} hover-underline-animation`}
                            style={{
                              fontWeight: "600",
                              fontSize: "1.4vh",
                              fontFamily: "Poppins",
                            }}
                            to={"/enroll"}
                          >
                            Colegio
                          </Link>
                        </Button>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "2vh",
                          width: "100%",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        <IconUser />
                        <Button
                          onClick={() => setOpenRegistroPadre(true)}
                          transparent
                          sx={{
                            fontWeight: "600",
                            fontSize: "1.4vh",
                            fontFamily: "Poppins",
                          }}
                        >
                          Padre de Familia
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}

            {OpenRegistroPadre && (
              <ModalRegistroFamilia
                open={OpenRegistroPadre}
                setOpen={setOpenRegistroPadre}
              />
            )}
            {OpenRegistroColegio && OpenLogin === false && (
              <FormInscripcion handlerOpenLogin={setOpenLogin} />
            )}
            <div>
              {OpenLogin === true &&
                OpenRegistroPadre === false &&
                isAuth === false && (
                  <FormLogin
                    setOpenLogin={setOpenLogin}
                    OpenLogin={OpenLogin}
                  />
                )}
            </div>
          </Box>
        </div> */}
      </Modal>
    </>
  );
}
