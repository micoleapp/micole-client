import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAcreditaciones } from "../../../../redux/SchoolsActions";

export default function Acred({ ids }) {
  const dispatch = useDispatch();
  const { oneSchool, Acre } = useSelector((state) => state.schools);

  useEffect(() => {
    dispatch(getAcreditaciones(ids));
  }, []);

  return (
    <div className="p-1 bg-white flex flex-col gap-5  shadow-md rounded-md ">
      <div className=" p-1  flex   text-xs max-w-[35vh] gap-5">
        <div className="grid grid-cols-1 gap-y-5 gap-x-3">
          <div>
            <p
              style={{
                fontSize: "2vh",
                paddingBottom: "1vh",
                color: "#0D263B",
                fontSize: "1.4vh",
              }}
            >
              Acreditaciones
            </p>
            {Acre[0]?.Afiliacions?.map((ac) => {
              return (
                <>
                  {ac.Afiliacion_tipo_Id === 1 && (
                    <div>
                      <li className="text-[#696969] text-[1.4vh]  flex items-start gap-3">
                        <img src={ac.logo} alt="" className="w-6" />
                        <p className="text-[1.6vh]">{ac.nombre_afiliacion}</p>
                      </li>
                    </div>
                  )}
                </>
              );
            })}
          </div>
          <div>
            <p
              style={{
                fontSize: "2vh",
                paddingBottom: "1vh",
                color: "#0D263B",
                fontSize: "1.4vh",
              }}
            >
              Alianzas
            </p>
            {Acre[0]?.Afiliacions?.map((ac) => {
              return (
                <>
                  {ac.Afiliacion_tipo_Id === 2 && (
                    <div>
                      <li className="text-[#696969] text-[1.8vh]  flex items-center gap-3">
                        <img src={ac.logo} alt="" className="w-6" />
                        <p className="text-[1.6vh]">{ac.nombre_afiliacion}</p>
                      </li>
                    </div>
                  )}
                </>
              );
            })}
          </div>
          <div>
            <p
              style={{
                fontSize: "2vh",
                paddingBottom: "1vh",
                color: "#0D263B",
                fontSize: "1.4vh",
              }}
            >
              Certificaciones
            </p>
            {Acre[0]?.Afiliacions?.map((ac) => {
              return (
                <>
                  {ac.Afiliacion_tipo_Id === 3 && (
                    <div>
                      <li className="text-[#696969] text-[1.8vh]  flex items-center gap-3">
                        <img src={ac.logo} alt="" className="w-6" />
                        <p className="text-[1.6vh]">{ac.nombre_afiliacion}</p>
                      </li>
                    </div>
                  )}
                </>
              );
            })}
          </div>
          <div>
            <p
              style={{
                fontSize: "2vh",
                paddingBottom: "1vh",
                color: "#0D263B",
                fontSize: "1.4vh",
              }}
            >
              Asociaciones
            </p>
            {Acre[0]?.Afiliacions?.map((ac) => {
              return (
                <>
                  {ac.Afiliacion_tipo_Id === 4 && (
                    <div>
                      <li className="text-[#696969] text-[1.8vh]  flex items-center gap-3">
                        <img src={ac.logo} alt="" className="w-6" />
                        <p className="text-[1.6vh]">{ac.nombre_afiliacion}</p>
                      </li>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
