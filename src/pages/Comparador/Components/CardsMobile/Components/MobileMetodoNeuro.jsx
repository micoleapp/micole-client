import React from "react";

import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Pincon from "../../Card/svg/PinIcon";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
export default function MobileMetodoNeuro() {
  const { arrColegios } = useSelector((state) => state.comparador);
  return (
    <div className="pl-1  pt-10 flex flex-col items-start justify-start">
      <div>
        <div className="pl-2  pb-2 flex flex-row w-full justify-end items-end gap-10">
          {" "}
          <p className="text-[1.6vh] font-semibold text-[#0D263B ">
            Metodologias
          </p>
          <p className="text-[1.6vh] font-semibold text-[#0D263B ">
            Neurodiversidad
          </p>
        </div>
        <motion.div
          className="box"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.1,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          {arrColegios?.map((c) => {
            return (
              <>
                <div className=" w-full min-w-[5vh] flex flex-row  pb-5 items-start justify-between gap-[3vh]">
                  <img
                    className="w-[7vh] h-[7vh]"
                    src={
                      c.colegio.logo === null
                        ? "https://res.cloudinary.com/dvztuncle/image/upload/v1682798271/3256151_zdcs0j.png"
                        : c.colegio.logo
                    }
                    alt={c.colegio.nombre_colegio}
                  />
                  <div className="">
                    {c.colegio.Metodos.length > 0 ? (
                      c.colegio.Metodos?.map((m) => {
                        return (
                          <>
                            <div
                              key={m}
                              style={{
                                display: "flex",
                                gap: "1vh",
                                fontSize: "1.6vh",
                                flexDirection: "row",
                              }}
                            >
                              <Pincon />
                              <p className="text-[1.6vh] ">{m.nombre_metodo}</p>
                            </div>
                          </>
                        );
                      })
                    ) : (
                      <div className="flex w-full items-center gap-1  pl-2 justify-start">
                        <DoDisturbIcon
                          sx={{ color: "#999999", width: "2vh" }}
                        />
                        <p className="text-[1.5vh]">Sin especificar</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex flex-start flex-col items-start">
                      {c.colegio.Dificultades.length > 0 ? (
                        c.colegio.Dificultades?.map((d) => {
                          return (
                            <>
                              <div
                                key={d}
                                style={{
                                  display: "flex",
                                  gap: "1vh",
                                  fontSize: "1.6vh",
                                  flexDirection: "row",
                                }}
                              >
                                <Pincon />
                                <p className="text-[1.6vh] text-ellipsis overflow-hidden max-w-[12vh] ">
                                  {d.nombre_dificultad}
                                </p>
                              </div>
                            </>
                          );
                        })
                      ) : (
                        <div className="flex w-full items-center gap-1  pl-2 justify-start">
                          <DoDisturbIcon
                            sx={{ color: "#999999", width: "2vh" }}
                          />
                          <p className="text-[1.5vh]">Sin Soporte</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
