import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { Rating } from "@mui/material";
import { MdDeleteForever } from "react-icons/md";
import style from "./snack.module.css";

import KeyboardArrowDownTwoToneIcon from "@mui/icons-material/KeyboardArrowDownTwoTone";
import { useDispatch } from "react-redux";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ClearComparador,
  deleteColegio,
} from "../../../redux/ComparadorActions";
import TrashIcon from "./svg/TrashIcon";
import SnackComparadorMobile from "./SnackMobile";
import { BalanceOutlined } from "@mui/icons-material";
function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function SnackComparador({ open, setOpen }) {
  //   const [open, setOpen] = useState(false);

  const { arrColegios } = useSelector((state) => state.comparador);
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    vertical: "bottom",
    horizontal: "right",
  });

  const [openSch, setOpenSch] = useState(true);
  const { vertical, horizontal } = state;

  const handleOpenList = () => {
    setOpenSch(!openSch);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleClear = (event, reason) => {
    setOpen(false);
    dispatch(ClearComparador());
 
  };
  useEffect(() => {
    setOpen(true);
  }, [arrColegios.length, arrColegios]);

  const handlerDelete = (e, id) => {
    dispatch(deleteColegio({ id }));
  };

  return (
    <>
      <div className={style.divDesktop}>
        <Stack spacing={2} sx={{ width: "100%" }}>
      
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            autoHideDuration={25000}
            onClose={handleClose}
          >
            <motion.div
              className="box"
              // animate={{ x: 100 }}
              transition={{ delay: 1 }}
            >
              <div className="p-5 flex flex-col items-start justify-start bg-white shadow-md ">
                <div  onClick={handleOpenList} className=" cursor-pointer flex flex-row gap-2 w-full justify-between">
                  <p className="font-semibold  text-[#0D263B] text-[1.8vh]">
                    Compara hasta 3 colegios
                  </p>

                  <KeyboardArrowDownTwoToneIcon
                    onClick={handleOpenList}
                    sx={{ color: "#0D263B" }}
                  />
                </div>
                {arrColegios.length === 3 && (
                  <motion.div
                    className="pb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.1,
                      ease: [0, 0.71, 0.2, 1.01],
                    }}
                  >
                    <p className="font-semibold  text-[#0061DF] text-[1.6vh]">
                      Comparador completo!
                    </p>
                  </motion.div>
                )}
                 {arrColegios.length > 0 &&arrColegios.length < 3 &&  (
                  <motion.div
                    className="pb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.1,
                      ease: [0, 0.71, 0.2, 1.01],
                    }}
                  >
                    <p className="font-semibold  text-[#0061DF] text-[1.6vh]">
                    Colegios agregados {"  "} {arrColegios.length}
                    </p>
                  </motion.div>
                )}
                {openSch && (
                  <div>
                    {arrColegios?.map((c) => {
                      return (
                        <>
                          {" "}
                          <motion.div
                            className={style.containerCard}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.3,
                              delay: 0.1,
                              ease: [0, 0.71, 0.2, 1.01],
                            }}
                          >
                            {/* HEAD */}

                            <div className="flex flex-row items-center ">
                              <div className={style.cardHead}>
                                <img
                                  src={
                                    c.colegio.logo === null
                                      ? "https://res.cloudinary.com/dvztuncle/image/upload/v1682798271/3256151_zdcs0j.png"
                                      : c.colegio.logo
                                  }
                                  alt={c.colegio.nombre_colegio}
                                />
                                <div className={style.cardHead_info}>
                                  <p
                                    style={{
                                      fontWeight: "700",
                                      color: "#0D263B",
                                      fontSize: "1.8vh",
                                    }}
                                  >
                                    {c.colegio.nombre_colegio}
                                  </p>
                                  <p>{c.colegio.Distrito?.nombre_distrito}</p>
                                  <div className="drop-shadow-md">
                                    <Rating
                                      name="simple-controlled"
                                      value={c.colegio.rating / 2}
                                      readOnly
                                      max={5}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              onClick={(e) => handlerDelete(e, c.colegio.id)}
                              className="flex flex-row items-center"
                            >
                              <TrashIcon
                                //   onClick={handlerDelete}
                                sx={{ cursor: "pointer" }}
                              />
                            </div>
                          </motion.div>
                        </>
                      );
                    })}
                  </div>
                )}

                <div className="flex flex-row gap-2 w-full items-center justify-center">
                  <Button onClick={handleClear} variant="outlined">
                    Cancelar
                  </Button>
                  <Button variant="contained">
                    <Link to={"/comparador"}>Comparar</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </Snackbar>
        </Stack>
      </div>

      <div className={style.divMobile}>
        <SnackComparadorMobile open={open} setOpen={setOpen} />
      </div>
    </>
  );
}
