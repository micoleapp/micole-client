import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { Rating } from "@mui/material";
import { MdDeleteForever } from "react-icons/md";
import style from "./snack.module.css";
import TrashIcon from "./svg/TrashIcon";
import KeyboardArrowDownTwoToneIcon from "@mui/icons-material/KeyboardArrowDownTwoTone";
import { useDispatch } from "react-redux";
import { deleteColegio } from "../../redux/ComparadorActions";

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
  }, [arrColegios.length,arrColegios]);

  const handlerDelete = (e, id) => {
    console.log('oli');
     dispatch(deleteColegio({id}))
  };
  return (
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
            <div>
              {arrColegios?.map((c) => {
                return (
                  <>
                    <div
                    //   onClick={handlerDelete}
                      className={style.containerCard}
                    >
                      {/* HEAD */}
                      <div className="flex flex-row items-center ">
                        <div className={style.cardHead}>
                          <img src={c.logo} alt={c.nombre_colegio} />
                          <div className={style.cardHead_info}>
                            <p
                              style={{
                                fontWeight: "700",
                                color: "#0D263B",
                                fontSize: "1.8vh",
                              }}
                            >
                              {c.nombre_colegio}
                            </p>
                            <p>{c.Distrito?.nombre_distrito}</p>
                            <div className="drop-shadow-md">
                              <Rating
                                name="simple-controlled"
                                value={c.rating / 2}
                                readOnly
                                max={5}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div onClick={(e)=> handlerDelete(e, c.id)} className="flex flex-row items-center  ">
                
                        <TrashIcon
                        //   onClick={handlerDelete}
                          sx={{ cursor: "pointer" }}
                        />
                 

                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          )}

          <div className="flex flex-row gap-2 w-full items-center justify-center">
            <Button onClick={handleClose} variant="outlined">
              Cancelar
            </Button>
            <Button  variant="contained">Comparar</Button>
          </div>
        </div>
      </Snackbar>
    </Stack>
  );
}
