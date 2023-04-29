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
import { deleteColegio } from "../../../redux/ComparadorActions";
import TrashIcon from "./svg/TrashIcon";
function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function SnackComparadorMobile({ open, setOpen }) {
  //   const [open, setOpen] = useState(false);

  const { arrColegios } = useSelector((state) => state.comparador);
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    vertical: "bottom",
    horizontal: "center",
  });

  const [openSch, setOpenSch] = useState(true);
  const { vertical, horizontal } = state;

  const handleClick = () => {
    setOpen(true);
  };
  const handleOpenList = () => {
    setOpenSch(!openSch);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
  }, [arrColegios.length, arrColegios]);

  const handlerDelete = (e, id) => {
    console.log("oli");
    dispatch(deleteColegio({ id }));
  };
  console.log(arrColegios);
  return (
    <>
      <div className={style.divMobile}>
        <Stack spacing={2} sx={{ width: "100%" }}>
          {/* <Button variant="outlined" onClick={handleClick}>
    Open success snackbar
  </Button> */}
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            autoHideDuration={16000}
            onClose={handleClose}
          >
            <motion.div
              className="box"
              // animate={{ x: 100 }}
              transition={{ delay: 1 }}
            >
              <div className="p-5 flex flex-col items-start justify-start bg-white shadow-md">
                <div className=" pb-2 flex flex-row gap-2 w-full justify-between">
                  <p className="font-semibold  text-[#0D263B] text-[1.8vh]">
                    Compara hasta 3 colegios
                  </p>
                  <KeyboardArrowDownTwoToneIcon
                    onClick={handleOpenList}
                    sx={{ color: "#0D263B" }}
                  />
                </div>
                {openSch && (
                  <motion.div
                    //  animate={{ x: 100 }}
                    transition={{ delay: 2 }}
                  >
                    {arrColegios?.map((c) => {
                      console.log(c);
                      return (
                        <>
                          {" "}
                          <motion.div
                            transition={{ delay: 2 }}
                            className={style.containerCard}
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
                  </motion.div>
                )}

                <div className="flex flex-row gap-2 w-full items-center justify-center">
                  <Button onClick={handleClose} variant="outlined">
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
    </>
  );
}
