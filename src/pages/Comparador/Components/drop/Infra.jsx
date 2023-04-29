import React, { useEffect, useState } from "react";
import axios from "axios";
import SwalProp from "../../../../exports/SwalProp";
import style from "./loader.module.css";
export default function InfraComparador({ id }) {
  const [Loader, setLoader] = useState(false);
  const [infraSH, setInfraSH] = useState([]);
  let infraColegio = infraSH && Object.assign({}, ...infraSH);

  useEffect(() => {
    try {
      setLoader(true);
      axios
        .get(`/colegios/infraestructuras/${id}`)
        .then((res) => {
          setInfraSH(res.data);
          setLoader(true);
        })
        .catch((err) => {
          SwalProp({
            status: false,
            title: "Algo salió mal",
            text: err,
          });
        });
    } catch (error) {
      SwalProp({
        status: false,
        title: "Algo salió mal",
        text: err,
      });
    }
  }, []);

  return (
    <div className=" p-5 bg-white flex flex-col gap-5  rounded-md ">
      <div className=" text-[1.8vh] flex flex-col  w-full justify-center">
        <p className="text-[1.6vh] font-medium text-[#0D263B] p-2  ">
          Administrativo
        </p>
        <div className="flex flex-col w-full gap-x-10 gap-y-5">
          {infraColegio?.Infraestructuras?.filter(
            (e) => e.InfraestructuraTipoId === 1
          ).map((e) => (
            <>
              <li className="flex flex-row   text-center lg:text-start  items-center  gap-3">
                {e.imagen.length > 0 ? (
                  <img
                    src={e.imagen}
                    alt={e.nombre_infraestructura}
                    className="w-5"
                  />
                ) : (
                  <img
                    src="https://es.digi.com/getattachment/products/networking/infrastructure-management/icon-im-usbconnectivity.png"
                    alt={e.nombre_infraestructura}
                    className="w-6"
                  />
                )}
                <p className="text-[1.4vh] text-start">
                  {e.nombre_infraestructura}
                </p>
              </li>
            </>
          ))}
        </div>
        <p className="text-[1.6vh] font-medium text-[#0D263B] p-2  ">
          Artística
        </p>
        <div className="flex flex-col w-full gap-x-10 gap-y-5">
          {infraColegio?.Infraestructuras?.filter(
            (e) => e.InfraestructuraTipoId === 2
          ).map((e) => (
            <li className="flex flex-row   text-center lg:text-start  items-center  gap-3">
              {e.imagen.length > 0 ? (
                <img
                  src={e.imagen}
                  alt={e.nombre_infraestructura}
                  className="w-5"
                />
              ) : (
                <img
                  src="https://es.digi.com/getattachment/products/networking/infrastructure-management/icon-im-usbconnectivity.png"
                  alt={e.nombre_infraestructura}
                  className="w-5"
                />
              )}
              <p className="text-[1.4vh] text-start">
                {e.nombre_infraestructura}
              </p>
            </li>
          ))}
        </div>
        <p className="text-[1.6vh] font-medium text-[#0D263B] p-2  ">
          Deportiva
        </p>
        <div className="flex flex-col w-full gap-x-10 gap-y-5">
          {infraColegio?.Infraestructuras?.filter(
            (e) => e.InfraestructuraTipoId === 3
          ).map((e) => (
            <li className="flex flex-row   text-center lg:text-start  items-center  gap-3">
              {e.imagen.length > 0 ? (
                <img
                  src={e.imagen}
                  alt={e.nombre_infraestructura}
                  className="w-5"
                />
              ) : (
                <img
                  src="https://es.digi.com/getattachment/products/networking/infrastructure-management/icon-im-usbconnectivity.png"
                  alt={e.nombre_infraestructura}
                  className="w-5"
                />
              )}
              <p className="text-[1.4vh] text-start">
                {e.nombre_infraestructura}
              </p>
            </li>
          ))}
        </div>
        <p className="text-[1.6vh] font-medium text-[#0D263B] p-2  ">
          Enseñanza
        </p>
        <div className="flex flex-col w-full gap-x-10 gap-y-5">
          {infraColegio?.Infraestructuras?.filter(
            (e) => e.InfraestructuraTipoId === 4
          ).map((e) => (
            <li className="flex flex-row   text-center lg:text-start  items-center  gap-3">
              {e.imagen.length > 0 ? (
                <img
                  src={e.imagen}
                  alt={e.nombre_infraestructura}
                  className="w-5"
                />
              ) : (
                <img
                  src="https://es.digi.com/getattachment/products/networking/infrastructure-management/icon-im-usbconnectivity.png"
                  alt={e.nombre_infraestructura}
                  className="w-5"
                />
              )}
              <p className="text-[1.4vh] text-start">
                {e.nombre_infraestructura}
              </p>
            </li>
          ))}
        </div>
        <p className="text-[1.6vh] font-medium text-[#0D263B] p-2  ">
          Laboratorio
        </p>
        <div className="flex flex-col w-full gap-x-10 gap-y-5">
          {infraColegio?.Infraestructuras?.filter(
            (e) => e.InfraestructuraTipoId === 5
          ).map((e) => (
            <li className="flex flex-row   text-center lg:text-start  items-center  gap-3">
              {e.imagen.length > 0 ? (
                <img
                  src={e.imagen}
                  alt={e.nombre_infraestructura}
                  className="w-5"
                />
              ) : (
                <img
                  src="https://es.digi.com/getattachment/products/networking/infrastructure-management/icon-im-usbconnectivity.png"
                  alt={e.nombre_infraestructura}
                  className="w-5"
                />
              )}
              <p className="text-[1.4vh] text-start">
                {e.nombre_infraestructura}
              </p>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}
