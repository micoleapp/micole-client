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
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackComparador({ open, setOpen }) {
  //   const [open, setOpen] = useState(false);
  const { arrColegios } = useSelector((state) => state.comparador);

  const [state, setState] = React.useState({
    vertical: "bottom",
    horizontal: "right",
  });
  const [openSch, setOpenSch] = useState(false);
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
  }, [arrColegios.length]);

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
        {/* <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert> */}
        <div className="p-2 flex flex-col items-start justify-start bg-white shadow-md">
          <div className="flex flex-row gap-2 w-full justify-between">
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
                    <div className={style.containerCard}>
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
                      <div className="flex flex-row items-center  ">
                        <TrashIcon />
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          )}
        </div>
      </Snackbar>
    </Stack>
  );
}
