import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector } from "react-redux";
import InfoGeneral from "../InfoColegios/InfoGeneral";
import Infraestructura from "../InfoColegios/Infraestructura/Infraestructura";
import Acreditaciones from "../InfoColegios/Acreditaciones/Acreditaciones";
import Ubicacion from "../Ubicacion/Ubicacion";
import FormListaEspera from "../Form-lista-espera/FormListEspera";
import CitasD from "../Citas/CitasD";
import SwiperEventos from "../../../components/SwiperEventos/SwiperEventos";
import GaleriaSD from "../Galeria/GaleriaSD";
import Button from "@mui/material/Button";
import BalanceIcon from "@mui/icons-material/Balance";
import Comentarios from "../Comentarios/Comentarios";
import style from "./TabsD.module.css";
export default function TabsDetail({
  id,
  gradoParams,
  ingresoParams,
  nombre_grado,
  listaParams,
}) {
  const { oneSchool } = useSelector((state) => state.schools);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [value, setValue] = useState("1");

  return (
    <main className="flex gap-5 flex-col lg:flex-row">
      <div className={style.divBox}>
        <div className="w-full flex  lg:items-end flex-start gap-4  pb-2 p-4 lg:justify-end justify-start">
          <Button
            onClick={(e) => handlerComparador(e, oneSchool.id)}
            variant="contained"
            sx={{
              fontFamily: "Poppins",
              fontWeight: "500",
              fontSize: "1.6vh",
              display: "flex",
              gap: "1vh",
              textTransform: "none",
            }}
          >
            <BalanceIcon sx={{ color: "#ffff" }} />
            Comparar
          </Button>
          {oneSchool.Plan_Pago?.PlanPagoId === 4 && (
            <Button
              variant="contained"
              sx={{
                fontFamily: "Poppins",
                fontWeight: "500",
                fontSize: "1.6vh",
                padding: "1vh",
                textTransform: "none",
              }}
            >
              Descargar Brochure
            </Button>
          )}
        </div>

        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              variant="scrollable"
              scrollButtons={true}
              aria-label="scrollable prevent TabList example"
              onChange={handleChange}
            >
              <Tab
                sx={{ textTransform: "none" }}
                label="Datos Generales"
                value="1"
              />
              <Tab
                sx={{ textTransform: "none" }}
                label="Infraestructura"
                value="2"
              />
              <Tab
                sx={{ textTransform: "none" }}
                label="Afiliaciones"
                value="3"
              />
              <Tab sx={{ textTransform: "none" }} label="Ubicación" value="4" />
              <Tab
                sx={{ textTransform: "none" }}
                label={
                  listaParams === "true" ? "Lista de espera" : "Reservar Citas"
                }
                value="5"
              />
              <Tab sx={{ textTransform: "none" }} label="Eventos" value="6" />
              <Tab
                sx={{ textTransform: "none" }}
                label="Comentarios"
                value="7"
              />
              <Tab
                sx={{ textTransform: "none" }}
                label="Multimedia"
                value="8"
              />
            </TabList>
          </Box>
          {/* Info basica de colegio*/}
          <TabPanel value="1">
            <InfoGeneral />
          </TabPanel>
          {/* Infraestructura */}
          <TabPanel value="2">
            <Infraestructura />
          </TabPanel>
          {/* Acreditaciones*/}
          <TabPanel value="3">
            <Acreditaciones />
          </TabPanel>
          {/* Ubicacion*/}
          <TabPanel value="4">
            <Ubicacion />
          </TabPanel>
          {/* // SACAR UNA CITA    //  Lista de espera */}
          <TabPanel value="5">
            {listaParams === "true" ? (
              //  Lista de espera
              <FormListaEspera
                gradoId={Number(gradoParams)}
                año={Number(ingresoParams)}
              />
            ) : (
              // SACAR UNA CITA
              <CitasD
                ingresoParams={ingresoParams}
                nombre_grado={nombre_grado}
              />
            )}
          </TabPanel>
          {/* Eventos */}
          <TabPanel value="6">
            {oneSchool?.Eventos?.length > 0 ? (
              <div className="w-full flex justify-center flex-col gap-2 p-2">
                <div className="w-full flex justify-start">
                  <h2 className="font-semibold  text-[#0D263B] pl-2 text-[2.4vh]">
                    Eventos
                  </h2>
                </div>

                <SwiperEventos data={oneSchool} />
              </div>
            ) : (
              <p className="font-semibold  text-[#0D263B] pl-2 text-[2vh]">
                Aún no hay eventos disponibles
              </p>
            )}
          </TabPanel>
          {/* Comentarios*/}
          <TabPanel value="7">
            <Comentarios id={id} />
          </TabPanel>
          {/* GALERIA / VIDEO */}
          <TabPanel value="8">
            <GaleriaSD />
          </TabPanel>
        </TabContext>
      </div>
    </main>
  );
}
