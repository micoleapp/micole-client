import { Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { getDataSchools } from "../../redux/ComparadorActions";
import CardsSch from "./Components/Card/CardsSch";
import style from "./compa.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import CardsMobileComparador from "./Components/CardsMobile/CardsMobileComparador";
export default function Comparador() {
  const dispatch = useDispatch();
  const [Vermas, setVermas] = useState(false);
  const { arrColegios } = useSelector((state) => state.comparador);
  //   const handler = () => {
  //     dispatch(getDataSchools({ colegio }));
  //   };
  return (
    <>
      <div className=" pb-[15vh] min-h-screen">
        {arrColegios.length > 0 ? (
          <>
            <div className="w-full flex items-center justify-end p-5 pr-11">
              {/* <Button
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  color: "0D263B",
                  fontSize: "1.5vh",
                }}
                variant="contained"
              >
                Descargar comparación
              </Button> */}
            </div>
         
         
         
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: "5vh",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  color: "0D263B",
                  fontSize: "2.5vh",
                }}
              >
                Comparador
              </Typography>
            </div>
          <div className={style.divDsktop}>
             <div
              style={{
                display: "flex",
                flexDirection: "row",
                height: "100%",
                gap: "3vh",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <CardsSch verMas={Vermas} setVermas={setVermas} />
            </div>
          </div>
          <div className={style.divMobile}>
        <CardsMobileComparador />
      </div>
          </>
        ) : (
          <div className="flex justify-center items-center p-5  semibold text-[3vh]">
            <p>Aún no has seleccionado ningun colegio!</p>
          </div>
        )}
      </div>
    </>
  );
}
