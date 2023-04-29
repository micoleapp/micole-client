import { Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { getDataSchools } from "../../redux/ComparadorActions";
import CardsSch from "./Components/Card/CardsSch";
import style from "./compa.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
// import { PDFDownloadLink ,PDFViewer} from "@react-pdf/renderer";
import CardsMobileComparador from "./Components/CardsMobile/CardsMobileComparador";
import { Link } from "react-router-dom";
// import ComparacionPdf from "./Components/Card/CardPdf";
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
              {/* <PDFDownloadLink
                document={<ComparacionPdf arrColegios={arrColegios} />}
                fileName="Comparacion.pdf"
              >
                <Button
                  sx={{
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    color: "0D263B",
                    fontSize: "1.5vh",
                  }}
                  variant="contained"
                >
                  Descargar comparación
                </Button>
              </PDFDownloadLink> */}
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
          <div className="flex justify-center items-center pt-5 gap-2 p-2 flex-col ">
            <img
              className="w-[10vh]  h-[10vh]"
              src="https://res.cloudinary.com/dvztuncle/image/upload/v1682803329/Group_186_idogrd.png"
              alt=""
            />
            <p className="pt-2 text-[#0D263B]  text-center font-semibold text-[2.5vh]">
              Aún no has seleccionado ningun colegio!
            </p>
            <p className="pt-2 text-center text-[1.8vh]">
              Explora todos los colegios qué tenemos registrados en MiCole{" "}
            </p>
            <Button variant="contained">
              <Link to={"/listschool?distrito=false&grado=false&ingreso=2023"}>Explorar</Link>
            </Button>
          </div>
        )}
      </div>

      {/* <PDFViewer style={{ width: "100%", height: "90vh" }}>
           <ComparacionPdf arrColegios={arrColegios} />
      </PDFViewer> */}
    </>
  );
}
