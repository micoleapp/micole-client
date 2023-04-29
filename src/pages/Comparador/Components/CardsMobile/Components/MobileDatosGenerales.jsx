import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Pincon from "../../Card/svg/PinIcon";
export default function MobileDatosGenerales() {
  const { arrColegios } = useSelector((state) => state.comparador);

  return (
    <div className="pt-10 w-full flex flex-col justify-center items-start">
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
              <div className="gap-2  w-full p-2 pl-2 flex flex-row  items-start  gap-7">
                <div className="flex justify-center items-center flex-col ">
                  <img
                    className="w-[8vh] h-[8vh]"
                    src={c.colegio.logo}
                    alt={c.colegio.nombre_colegio}
                  />
                </div>

                <div className=" flex flex-col items-start justify-start min-w-[20vh]">
                  <div>
                    <p className="text-[1.8vh]   font-semibold text-[#0D263B]">
                      Direccion
                    </p>
                    <p className="text-[1.6vh] text-ellipsis overflow-hidden max-w-[20vh]">
                      {c.colegio.direccion}
                    </p>
                  </div>

                  <div className="flex flex-col pb-2  ">
                    <p className="text-[1.8vh] pb-2 font-semibold text-[#0D263B]">
                      Tipo de escuela
                    </p>
                    {c.colegio.Categoria?.map((ca) => {
                      return (
                        <>
                          <div
                            style={{
                              display: "flex",
                              gap: "1vh",
                              fontSize: "1.4vh",
                              flexDirection: "row",
                            }}
                          >
                            <Pincon />
                            <p className="text-[1.5vh] ">
                              {ca.nombre_categoria}
                            </p>
                          </div>
                        </>
                      );
                    })}
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <p className="text-[1.8vh] font-semibold text-[#0D263B]">
                      Area
                    </p>
                    <p className="text-[1.6vh]">
                      {" "}
                      {c.colegio.area} {"m2"}
                    </p>
                    <p className="text-[1.8vh] font-semibold text-[#0D263B]">
                      Alumnos
                    </p>
                    <p className="text-[1.6vh] pb-10">
                      {c.colegio.numero_estudiantes} {"alumnos"}
                    </p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </motion.div>
    </div>
  );
}
