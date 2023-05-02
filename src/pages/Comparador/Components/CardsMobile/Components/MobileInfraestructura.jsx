import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import AcredComparador from "../../drop/Acred";
import style from "../cardMobile.module.css";
import InfraComparador from "../../drop/Infra";

export default function MobileInfraestructura() {
  const { arrColegios } = useSelector((state) => state.comparador);
  return (
    <div className="pt-10 flex flex-col items-start justify-start">
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
              <div className={style.containerCard}>
                <div className="  w-full min-w-[5vh] flex flex-row  pb-5 items-start justify-between gap-[5vh]">
                  <img
                    className="w-[7vh] h-[7vh]"
                 
                    src={
                      c.colegio.logo === null
                        ? "https://res.cloudinary.com/dvztuncle/image/upload/v1682798271/3256151_zdcs0j.png"
                        : c.colegio.logo
                    }
                    alt={c.colegio.nombre_colegio}
                  />
                  <div
                    className={`${style.div} max-h-[50vh] min-w-[25vh]   items-start justify-start  `}
                  >
                    <InfraComparador comparador id={c.colegio.id} />
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
