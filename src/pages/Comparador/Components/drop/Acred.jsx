import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAcreditaciones } from "../../../../redux/SchoolsActions";
import { getAcreditacionesComparador } from "../../../../redux/ComparadorActions";
import axios from "axios";
import SwalProp from "../../../../exports/SwalProp";

export default function AcredComparador({ ids, nameColegio }) {
  const dispatch = useDispatch();
  // const { Afilia , arrColegios } = useSelector((state) => state.comparador);
  const [Afilia, setAfilia] = useState([]);

  useEffect(() => {
    // dispatch(getAcreditacionesComparador(ids));
    try {
      axios

        .get(`/colegios/afiliacion/${ids}`)
        .then((res) => {
          console.log(res.data);
          // dispatch(getAcreCom(res.data));
          setAfilia(res.data);
        })
        .catch((err) => {
          SwalProp({
            status: false,
            title: "Algo salió mal",
            text: err,
          });
        });
    } catch (err) {
      SwalProp({
        status: false,
        title: "Algo salió mal",
        text: err,
      });
    }
  }, []);

  return (
    <div className="p-1 bg-white flex flex-col h-fit   ">
      <div className=" p-1  flex   text-xs max-w-[35vh] gap-5">
        {Afilia&&Afilia?.map((ac) => {
          return (
            <div key={ac.nombre_colegio}>
              {nameColegio === ac.nombre_colegio && (
                <div className="grid grid-cols-1 gap-y-5 gap-x-3">
                  {/* Acre */}
                  <div key={ac.nombre_colegio}>
                    <p
                     className="text-[1.6vh] font-medium text-[#0D263B] pb-2 "
                    >
                      Acreditaciones
                    </p>

                    {ac.Afiliacions?.map((ele) => {
                      return (
                        <>
                          {ele.Afiliacion_tipo_Id === 1 && (
                            <div>
                              <li className="text-[#696969] text-[1.4vh]  flex items-start gap-3">
                                <img src={ele?.logo} alt="" className="w-6" />
                                <p className="text-[1.4vh]">
                                  {ele.nombre_afiliacion}
                                </p>
                              </li>
                            </div>
                          )}
                        </>
                      );
                    })}
                  </div>
                  {/* Ali*/}
                  <div>
                    <p
                     className="text-[1.6vh] font-medium text-[#0D263B] pb-2 "
                    >
                      Alianzas
                    </p>
                    {ac.Afiliacions?.map((ele) => {
                      return (
                        <>
                          {ele.Afiliacion_tipo_Id === 2 && (
                            <div>
                              <li className="text-[#696969] text-[1.8vh]  flex items-center gap-3">
                                <img src={ele.logo} alt="" className="w-6" />
                                <p className="text-[1.4vh]">
                                  {ele.nombre_afiliacion}
                                </p>
                              </li>
                            </div>
                          )}
                        </>
                      );
                    })}
                  </div>
                  {/* cer */}
                  <div>
                    <p
                    className="text-[1.6vh] font-medium text-[#0D263B] pb-2 "
                    >
                      Certificaciones
                    </p>
                    {ac.Afiliacions?.map((ele) => {
                      return (
                        <>
                          {ele.Afiliacion_tipo_Id === 3 && (
                            <div>
                              <li className="text-[#696969] text-[1.8vh]  flex items-center gap-3">
                                <img src={ele.logo} alt="" className="w-6" />
                                <p className="text-[1.4vh]">
                                  {ele.nombre_afiliacion}
                                </p>
                              </li>
                            </div>
                          )}
                        </>
                      );
                    })}
                  </div>
                  {/* Aso */}
                  <div>
                    <p
                   className="text-[1.6vh] font-medium text-[#0D263B] pb-2 "
                    >
                      Asociaciones
                    </p>
                    {ac.Afiliacions?.map((ele) => {
                      return (
                        <>
                          {ele.Afiliacion_tipo_Id === 4 && (
                            <div>
                              <li className="text-[#696969] text-[1.8vh]  flex flex-end items-center gap-3">
                                <img src={ele.logo} alt="" className="w-6" />
                                <p className="text-[1.4vh]">
                                  {ele.nombre_afiliacion}
                                </p>
                              </li>
                            </div>
                          )}
                        </>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
