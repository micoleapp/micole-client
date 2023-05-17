import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import {
  getHorariosSchool,
  postHorariosVacantes,
} from "../../../redux/SchoolsActions";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SwalProp from "../../../exports/SwalProp";
import { getSchoolDetail } from "../../../redux/AuthActions";
import {

  MobileTimePicker,
} from "@mui/x-date-pickers";
import { TextField } from "@mui/material";

import deleteIcon from "../../../assets/deleteIcon.png";
import editIcon from "../../../assets/editIcon.png";
import addIcon from "../../../assets/addIcon.png";
export default function HorariosColegio() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { horariosColegio } = useSelector((state) => state.schools);
  let getHorarios = () => {
    const diasGuardados = [];
    horariosColegio.map((dia) => {
      diasGuardados.push({ dia: dia.dia, horarios: dia.horarios });
    });
    const Lunesfilter = diasGuardados.filter((d) => d.dia == "Lunes");
    const lun = [];
    Lunesfilter.map((c) => lun.push(c.horarios));
    if (lun.length > 0) {
      setLunesString(lun[0]);
      const lundate = lun[0].map((l) => ({
        horario: [
          dayjs(stringToDate(l.desde)),
          dayjs(stringToDate(l.hasta)),
          false,
        ],
      }));
      if (lundate.length > 0) {
        setLunes(lundate);
      }
    }

    const Martesfilter = diasGuardados.filter((d) => d.dia == "Martes");
    const mar = [];
    Martesfilter.map((c) => mar.push(c.horarios));
    if (mar.length > 0) {
      setMartesString(mar[0]);
      const mardate = mar[0].map((l) => ({
        horario: [
          dayjs(stringToDate(l.desde)),
          dayjs(stringToDate(l.hasta)),
          false,
        ],
      }));
      if (mardate.length > 0) {
        setMartes(mardate);
      }
    }

    const Miercolesfilter = diasGuardados.filter((d) => d.dia == "Miercoles");
    const mie = [];
    Miercolesfilter.map((c) => mie.push(c.horarios));
    if (mie.length > 0) {
      setMiercolesString(mie[0]);
      const miedate = mie[0].map((l) => ({
        horario: [
          dayjs(stringToDate(l.desde)),
          dayjs(stringToDate(l.hasta)),
          false,
        ],
      }));
      if (miedate.length > 0) {
        setMiercoles(miedate);
      }
    }

    const Juevesfilter = diasGuardados.filter((d) => d.dia == "Jueves");
    const jue = [];
    Juevesfilter.map((c) => jue.push(c.horarios));
    if (jue.length > 0) {
      setJuevesString(jue[0]);
      const juedate = jue[0].map((l) => ({
        horario: [
          dayjs(stringToDate(l.desde)),
          dayjs(stringToDate(l.hasta)),
          false,
        ],
      }));
      if (juedate.length > 0) {
        setJueves(juedate);
      }
    }

    const Viernesfilter = diasGuardados.filter((d) => d.dia == "Viernes");
    const vie = [];
    Viernesfilter.map((c) => vie.push(c.horarios));
    if (vie.length > 0) {
      setViernesString(vie[0]);
      const viedate = vie[0].map((l) => ({
        horario: [
          dayjs(stringToDate(l.desde)),
          dayjs(stringToDate(l.hasta)),
          false,
        ],
      }));
      if (viedate.length > 0) {
        setViernes(viedate);
      }
    }
  };
  const stringyDate = (date) => {
    if (date.toString().length === 1) {
      return "0" + date++;
    } else {
      return date;
    }
  };
  const initialDaysWithTime = [];

  const initialStringDays = [];

  const [Lunes, setLunes] = React.useState(initialDaysWithTime);
  const [Martes, setMartes] = React.useState(initialDaysWithTime);
  const [Miercoles, setMiercoles] = React.useState(initialDaysWithTime);
  const [Jueves, setJueves] = React.useState(initialDaysWithTime);
  const [Viernes, setViernes] = React.useState(initialDaysWithTime);

  const [LunesString, setLunesString] = React.useState(initialStringDays);
  const [MartesString, setMartesString] = React.useState(initialStringDays);
  const [MiercolesString, setMiercolesString] =
    React.useState(initialStringDays);
  const [JuevesString, setJuevesString] = React.useState(initialStringDays);
  const [ViernesString, setViernesString] = React.useState(initialStringDays);

  let disabledSubmitCitas = false;

  const stringToDate = (string) => {
    let horario = "2014-08-18 ".concat(string).concat(":00");
    return horario;
  };

  useEffect(() => {
    dispatch(getHorariosSchool(user.id));
    getHorarios();
  }, []);

  useEffect(() => {
    dispatch(getHorariosSchool(user.id));
    getHorarios();
  }, [horariosColegio.length]);

  const editHorario = (setdia, dia, index) => {
    if (dia[index].horario[2] === false) {
      setdia([
        ...dia.slice(0, index),
        {
          horario: [dia[index].horario[0], dia[index].horario[1], true],
        },

        ...dia.slice(index + 1),
      ]);
    } else {
      setdia([
        ...dia.slice(0, index),
        {
          horario: [dia[index].horario[0], dia[index].horario[1], false],
        },

        ...dia.slice(index + 1),
      ]);
      console.log(dia[index].horario[2]);
    }
  };
  const deleteHorario = (setdia, setString, dia, diaString, index) => {
    setdia([...dia.slice(0, index), ...dia.slice(index + 1)]);

    setString([...diaString.slice(0, index), ...diaString.slice(index + 1)]);
  };
  const addHorario = (setdia, dia, setString, diaString) => {
    setdia([
      ...dia,
      {
        horario: [
          dayjs("2014-08-18T10:00:00"),
          dayjs("2014-08-18T11:00:00"),
          true,
        ],
      },
    ]);
    setString([
      ...diaString,
      {
        desde: "10:00",
        hasta: "11:00",
      },
    ]);
  };

  const handleSubmitCitas = (e) => {
    e.preventDefault();
    const stringDays = [
      { dia: "Lunes", horarios: [...LunesString] },
      { dia: "Martes", horarios: [...MartesString] },
      { dia: "Miercoles", horarios: [...MiercolesString] },
      { dia: "Jueves", horarios: [...JuevesString] },
      { dia: "Viernes", horarios: [...ViernesString] },
    ];
    const diasActivos = stringDays.filter((ele) => ele.horarios.length > 0);

    dispatch(postHorariosVacantes(diasActivos, user.id));
    console.log(user.id);
    try {
      axios
        .put(`/colegios/activo/${user.id}`, { isActive: true })
        .then((res) => {
          SwalProp({
            status: true,
            title: "Felicitaciones!",
            text: "Colegio listo para mostrarse en nuestra página!",
          });
          dispatch(getSchoolDetail(user.id));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen p-5 flex flex-col gap-5">
      <h1 className="text-[2.5vh] font-medium">
        Deberas completar estos datos para aparecer en nuestra lista
      </h1>
      <p className="text-[1.8vh] text-[#7A7777]">
        En esta sección, indica tu disponibilidad horaria para atender al
        público. Las familias podrán programar citas en los horarios que
        especifiques. Si no especifica horarios en un día, se considerará como
        un día no disponible para atención al público.{" "}
      </p>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="grid lg:grid-cols-3 w-full grid-cols-2">
          <div className="my-3">
            <span>Lunes</span>
            <div className="flex flex-col gap-3">
              {Lunes &&
                Lunes.map((hora, index) => (
                  <>
                    {" "}
                    <small className="font-semibold">
                      {[
                        stringyDate(hora.horario[0]["$H"]).toString(),
                        stringyDate(hora.horario[0]["$m"]).toString(),
                      ].join(":")}{" "}
                      -{" "}
                      {[
                        stringyDate(hora.horario[1]["$H"]).toString(),
                        stringyDate(hora.horario[1]["$m"]).toString(),
                      ].join(":")}{" "}
                      <button
                        className="ml-6 scale-75"
                        onClick={() => editHorario(setLunes, Lunes, index)}
                      >
                        <img src={editIcon} alt="edit"></img>
                      </button>
                      <button
                        className="ml-3 scale-75"
                        onClick={() =>
                          deleteHorario(
                            setLunes,
                            setLunesString,
                            Lunes,
                            LunesString,
                            index
                          )
                        }
                      >
                        <img src={deleteIcon} alt="delete"></img>
                      </button>
                    </small>
                    {hora.horario[0] >= hora.horario[1] ? (
                      <span className="text-red-600 text-sm -mt-3 ">
                        Horario Incorrecto
                      </span>
                    ) : null}
                    {hora.horario[0] >= hora.horario[1]
                      ? (disabledSubmitCitas = true)
                      : (disabledSubmitCitas = disabledSubmitCitas)}
                    {Lunes[index].horario[2] === true ? (
                      <div className="flex-col gap-2">
                        <div className="flex gap-2">
                          {" "}
                          <MobileTimePicker
                            label="Desde"
                            disabled={!hora.horario[2]}
                            className="w-[70px] bg-white"
                            value={hora.horario[0]}
                            renderInput={(params) => <TextField {...params} />}
                            ampm={false}
                            onChange={(newValue) => {
                              setLunes([
                                ...Lunes.slice(0, index),
                                {
                                  horario: [newValue, hora.horario[1], true],
                                },
                                ...Lunes.slice(index + 1),
                              ]);
                              setLunesString([
                                ...LunesString.slice(0, index),
                                {
                                  desde: stringyDate(newValue["$H"])
                                    .toString()
                                    .concat(":")
                                    .concat(
                                      stringyDate(newValue["$m"]).toString()
                                    ),
                                  hasta: stringyDate(hora.horario[1]["$H"])
                                    .toString()
                                    .concat(":")
                                    .concat(
                                      stringyDate(
                                        hora.horario[1]["$m"]
                                      ).toString()
                                    ),
                                },
                                ...LunesString.slice(index + 1),
                              ]);
                            }}
                            minutesStep={5}
                            minTime={dayjs("2014-08-18T08:00:00")}
                            maxTime={dayjs("2014-08-18T16:45:00")}
                          />
                          <MobileTimePicker
                            label="Hasta"
                            disabled={!hora.horario[2]}
                            className="w-[70px] bg-white"
                            onChange={(newValue) => {
                              setLunes([
                                ...Lunes.slice(0, index),
                                {
                                  horario: [hora.horario[0], newValue, true],
                                },
                                ...Lunes.slice(index + 1),
                              ]);
                              setLunesString([
                                ...LunesString.slice(0, index),
                                {
                                  desde: stringyDate(hora.horario[0]["$H"])
                                    .toString()
                                    .concat(":")
                                    .concat(
                                      stringyDate(
                                        hora.horario[0]["$m"]
                                      ).toString()
                                    ),
                                  hasta: stringyDate(newValue["$H"])
                                    .toString()
                                    .concat(":")
                                    .concat(
                                      stringyDate(newValue["$m"]).toString()
                                    ),
                                },
                                ...LunesString.slice(index + 1),
                              ]);
                            }}
                            value={Lunes[index].horario[1]}
                            renderInput={(params) => <TextField {...params} />}
                            ampm={false}
                            minutesStep={5}
                            minTime={hora.horario[0]}
                            maxTime={dayjs("2014-08-18T17:00:00")}
                          />
                        </div>
                      </div>
                    ) : null}
                  </>
                ))}

              <button
                className="flex "
                onClick={() =>
                  addHorario(setLunes, Lunes, setLunesString, LunesString)
                }
              >
                <img src={addIcon} alt="edit"></img>
                <span className="ml-2 text-[#0061dd]">Añadir Horas</span>
              </button>
            </div>
          </div>
          <div className="my-3">
            <span>Martes</span>
            <div className="flex flex-col gap-3">
              {Martes &&
                Martes.map((hora, index) => (
                  <>
                    {" "}
                    <small className="font-semibold">
                      {[
                        stringyDate(hora.horario[0]["$H"]).toString(),
                        stringyDate(hora.horario[0]["$m"]).toString(),
                      ].join(":")}{" "}
                      -{" "}
                      {[
                        stringyDate(hora.horario[1]["$H"]).toString(),
                        stringyDate(hora.horario[1]["$m"]).toString(),
                      ].join(":")}{" "}
                      <button
                        className="ml-6 scale-75"
                        onClick={() => editHorario(setMartes, Martes, index)}
                      >
                        <img src={editIcon} alt="edit"></img>
                      </button>
                      <button
                        className="ml-3 scale-75"
                        onClick={() =>
                          deleteHorario(
                            setMartes,
                            setMartesString,
                            Martes,
                            MartesString,
                            index
                          )
                        }
                      >
                        <img src={deleteIcon} alt="delete"></img>
                      </button>
                    </small>
                    {hora.horario[0] >= hora.horario[1] ? (
                      <span className="text-red-600 text-sm -mt-3 ">
                        Horario Incorrecto
                      </span>
                    ) : null}
                    {hora.horario[0] >= hora.horario[1]
                      ? (disabledSubmitCitas = true)
                      : (disabledSubmitCitas = disabledSubmitCitas)}
                    {Martes[index].horario[2] === true ? (
                      <div className="flex gap-2">
                        <MobileTimePicker
                          label="Desde"
                          disabled={!hora.horario[2]}
                          className="w-[70px] bg-white"
                          value={hora.horario[0]}
                          renderInput={(params) => <TextField {...params} />}
                          ampm={false}
                          onChange={(newValue) => {
                            setMartes([
                              ...Martes.slice(0, index),
                              {
                                horario: [newValue, hora.horario[1], true],
                              },
                              ...Martes.slice(index + 1),
                            ]);
                            setMartesString([
                              ...MartesString.slice(0, index),
                              {
                                desde: stringyDate(newValue["$H"])
                                  .toString()
                                  .concat(":")
                                  .concat(
                                    stringyDate(newValue["$m"]).toString()
                                  ),
                                hasta: stringyDate(hora.horario[1]["$H"])
                                  .toString()
                                  .concat(":")
                                  .concat(
                                    stringyDate(
                                      hora.horario[1]["$m"]
                                    ).toString()
                                  ),
                              },
                              ...MartesString.slice(index + 1),
                            ]);
                          }}
                          minutesStep={5}
                          minTime={dayjs("2014-08-18T08:00:00")}
                          maxTime={dayjs("2014-08-18T16:45:00")}
                        />
                        <MobileTimePicker
                          label="Hasta"
                          disabled={!hora.horario[2]}
                          className="w-[70px] bg-white"
                          onChange={(newValue) => {
                            setMartes([
                              ...Martes.slice(0, index),
                              {
                                horario: [hora.horario[0], newValue, true],
                              },
                              ...Martes.slice(index + 1),
                            ]);
                            setMartesString([
                              ...MartesString.slice(0, index),
                              {
                                desde: stringyDate(hora.horario[0]["$H"])
                                  .toString()
                                  .concat(":")
                                  .concat(
                                    stringyDate(
                                      hora.horario[0]["$m"]
                                    ).toString()
                                  ),
                                hasta: stringyDate(newValue["$H"])
                                  .toString()
                                  .concat(":")
                                  .concat(
                                    stringyDate(newValue["$m"]).toString()
                                  ),
                              },
                              ...MartesString.slice(index + 1),
                            ]);
                          }}
                          value={Martes[index].horario[1]}
                          renderInput={(params) => <TextField {...params} />}
                          ampm={false}
                          minutesStep={5}
                          minTime={hora.horario[0]}
                          maxTime={dayjs("2014-08-18T17:00:00")}
                        />
                      </div>
                    ) : null}
                  </>
                ))}
              <button
                className="flex"
                onClick={() =>
                  addHorario(setMartes, Martes, setMartesString, MartesString)
                }
              >
                <img src={addIcon} alt="edit"></img>
                <span className="ml-2 text-[#0061dd]">Añadir Horas</span>
              </button>
            </div>
          </div>
          <div className="my-3">
            <span>Miércoles</span>
            <div className="flex flex-col gap-3">
              {Miercoles &&
                Miercoles.map((hora, index) => (
                  <>
                    {" "}
                    <small className="font-semibold">
                      {[
                        stringyDate(hora.horario[0]["$H"]).toString(),
                        stringyDate(hora.horario[0]["$m"]).toString(),
                      ].join(":")}{" "}
                      -{" "}
                      {[
                        stringyDate(hora.horario[1]["$H"]).toString(),
                        stringyDate(hora.horario[1]["$m"]).toString(),
                      ].join(":")}{" "}
                      <button
                        className="ml-6 scale-75"
                        onClick={() =>
                          editHorario(setMiercoles, Miercoles, index)
                        }
                      >
                        <img src={editIcon} alt="edit"></img>
                      </button>
                      <button
                        className="ml-3 scale-75"
                        onClick={() =>
                          deleteHorario(
                            setMiercoles,
                            setMiercolesString,
                            Miercoles,
                            MiercolesString,
                            index
                          )
                        }
                      >
                        <img src={deleteIcon} alt="delete"></img>
                      </button>
                    </small>
                    {hora.horario[0] >= hora.horario[1] ? (
                      <span className="text-red-600 text-sm -mt-3 ">
                        Horario Incorrecto
                      </span>
                    ) : null}
                    {hora.horario[0] >= hora.horario[1]
                      ? (disabledSubmitCitas = true)
                      : (disabledSubmitCitas = disabledSubmitCitas)}
                    {Miercoles[index].horario[2] === true ? (
                      <div className="flex gap-2">
                        <MobileTimePicker
                          label="Desde"
                          disabled={!hora.horario[2]}
                          className="w-[70px] bg-white"
                          value={hora.horario[0]}
                          renderInput={(params) => <TextField {...params} />}
                          ampm={false}
                          onChange={(newValue) => {
                            setMiercoles([
                              ...Miercoles.slice(0, index),
                              {
                                horario: [newValue, hora.horario[1], true],
                              },
                              ...Miercoles.slice(index + 1),
                            ]);
                            setMiercolesString([
                              ...MiercolesString.slice(0, index),
                              {
                                desde: stringyDate(newValue["$H"])
                                  .toString()
                                  .concat(":")
                                  .concat(
                                    stringyDate(newValue["$m"]).toString()
                                  ),
                                hasta: stringyDate(hora.horario[1]["$H"])
                                  .toString()
                                  .concat(":")
                                  .concat(
                                    stringyDate(
                                      hora.horario[1]["$m"]
                                    ).toString()
                                  ),
                              },
                              ...MiercolesString.slice(index + 1),
                            ]);
                          }}
                          minutesStep={5}
                          minTime={dayjs("2014-08-18T08:00:00")}
                          maxTime={dayjs("2014-08-18T16:45:00")}
                        />
                        <MobileTimePicker
                          label="Hasta"
                          disabled={!hora.horario[2]}
                          className="w-[70px] bg-white"
                          onChange={(newValue) => {
                            setMiercoles([
                              ...Miercoles.slice(0, index),
                              {
                                horario: [hora.horario[0], newValue, true],
                              },
                              ...Miercoles.slice(index + 1),
                            ]);
                            setMiercolesString([
                              ...MiercolesString.slice(0, index),
                              {
                                desde: stringyDate(hora.horario[0]["$H"])
                                  .toString()
                                  .concat(":")
                                  .concat(
                                    stringyDate(
                                      hora.horario[0]["$m"]
                                    ).toString()
                                  ),
                                hasta: stringyDate(newValue["$H"])
                                  .toString()
                                  .concat(":")
                                  .concat(
                                    stringyDate(newValue["$m"]).toString()
                                  ),
                              },
                              ...MiercolesString.slice(index + 1),
                            ]);
                          }}
                          value={Miercoles[index].horario[1]}
                          renderInput={(params) => <TextField {...params} />}
                          ampm={false}
                          minutesStep={5}
                          minTime={hora.horario[0]}
                          maxTime={dayjs("2014-08-18T17:00:00")}
                        />
                      </div>
                    ) : null}
                  </>
                ))}
              <button
                className="flex"
                onClick={() =>
                  addHorario(
                    setMiercoles,
                    Miercoles,
                    setMiercolesString,
                    MiercolesString
                  )
                }
              >
                <img src={addIcon} alt="edit"></img>
                <span className="ml-2 text-[#0061dd]">Añadir Horas</span>
              </button>
            </div>
          </div>

          <div className="my-3">
            <span>Jueves</span>
            <div className="flex flex-col gap-3">
              {Jueves &&
                Jueves.map((hora, index) => (
                  <>
                    {" "}
                    <small className="font-semibold">
                      {[
                        stringyDate(hora.horario[0]["$H"]).toString(),
                        stringyDate(hora.horario[0]["$m"]).toString(),
                      ].join(":")}{" "}
                      -{" "}
                      {[
                        stringyDate(hora.horario[1]["$H"]).toString(),
                        stringyDate(hora.horario[1]["$m"]).toString(),
                      ].join(":")}{" "}
                      <button
                        className="ml-6 scale-75"
                        onClick={() => editHorario(setJueves, Jueves, index)}
                      >
                        <img src={editIcon} alt="edit"></img>
                      </button>
                      <button
                        className="ml-3 scale-75"
                        onClick={() =>
                          deleteHorario(
                            setJueves,
                            setJuevesString,
                            Jueves,
                            JuevesString,
                            index
                          )
                        }
                      >
                        <img src={deleteIcon} alt="delete"></img>
                      </button>
                    </small>
                    {hora.horario[0] >= hora.horario[1] ? (
                      <span className="text-red-600 text-sm -mt-3 ">
                        Horario Incorrecto
                      </span>
                    ) : null}
                    {hora.horario[0] >= hora.horario[1]
                      ? (disabledSubmitCitas = true)
                      : (disabledSubmitCitas = disabledSubmitCitas)}
                    {Jueves[index].horario[2] === true ? (
                      <div className="flex gap-2">
                        <MobileTimePicker
                          label="Desde"
                          disabled={!hora.horario[2]}
                          className="w-[70px] bg-white"
                          value={hora.horario[0]}
                          renderInput={(params) => <TextField {...params} />}
                          ampm={false}
                          onChange={(newValue) => {
                            setJueves([
                              ...Jueves.slice(0, index),
                              {
                                horario: [newValue, hora.horario[1], true],
                              },
                              ...Jueves.slice(index + 1),
                            ]);
                            setJuevesString([
                              ...JuevesString.slice(0, index),
                              {
                                desde: stringyDate(newValue["$H"])
                                  .toString()
                                  .concat(":")
                                  .concat(
                                    stringyDate(newValue["$m"]).toString()
                                  ),
                                hasta: stringyDate(hora.horario[1]["$H"])
                                  .toString()
                                  .concat(":")
                                  .concat(
                                    stringyDate(
                                      hora.horario[1]["$m"]
                                    ).toString()
                                  ),
                              },
                              ...JuevesString.slice(index + 1),
                            ]);
                          }}
                          minutesStep={5}
                          minTime={dayjs("2014-08-18T08:00:00")}
                          maxTime={dayjs("2014-08-18T16:45:00")}
                        />
                        <MobileTimePicker
                          label="Hasta"
                          disabled={!hora.horario[2]}
                          className="w-[70px] bg-white"
                          onChange={(newValue) => {
                            setJueves([
                              ...Jueves.slice(0, index),
                              {
                                horario: [hora.horario[0], newValue, true],
                              },
                              ...Jueves.slice(index + 1),
                            ]);
                            setJuevesString([
                              ...JuevesString.slice(0, index),
                              {
                                desde: stringyDate(hora.horario[0]["$H"])
                                  .toString()
                                  .concat(":")
                                  .concat(
                                    stringyDate(
                                      hora.horario[0]["$m"]
                                    ).toString()
                                  ),
                                hasta: stringyDate(newValue["$H"])
                                  .toString()
                                  .concat(":")
                                  .concat(
                                    stringyDate(newValue["$m"]).toString()
                                  ),
                              },
                              ...JuevesString.slice(index + 1),
                            ]);
                          }}
                          value={Jueves[index].horario[1]}
                          renderInput={(params) => <TextField {...params} />}
                          ampm={false}
                          minutesStep={5}
                          minTime={hora.horario[0]}
                          maxTime={dayjs("2014-08-18T17:00:00")}
                        />
                      </div>
                    ) : null}
                  </>
                ))}
              <button
                className="flex"
                onClick={() =>
                  addHorario(setJueves, Jueves, setJuevesString, JuevesString)
                }
              >
                <img src={addIcon} alt="edit"></img>
                <span className="ml-2 text-[#0061dd]">Añadir Horas</span>
              </button>
            </div>
          </div>
          <div className="my-3">
            <span>Viernes</span>
            <div className="flex flex-col gap-3">
              {Viernes &&
                Viernes.map((hora, index) => (
                  <>
                    {" "}
                    <small className="font-semibold">
                      {[
                        stringyDate(hora.horario[0]["$H"]).toString(),
                        stringyDate(hora.horario[0]["$m"]).toString(),
                      ].join(":")}{" "}
                      -{" "}
                      {[
                        stringyDate(hora.horario[1]["$H"]).toString(),
                        stringyDate(hora.horario[1]["$m"]).toString(),
                      ].join(":")}{" "}
                      <button
                        className="ml-6 scale-75"
                        onClick={() => editHorario(setViernes, Viernes, index)}
                      >
                        <img src={editIcon} alt="edit"></img>
                      </button>
                      <button
                        className="ml-3 scale-75"
                        onClick={() =>
                          deleteHorario(
                            setViernes,
                            setViernesString,
                            Viernes,
                            ViernesString,
                            index
                          )
                        }
                      >
                        <img src={deleteIcon} alt="delete"></img>
                      </button>
                    </small>
                    {hora.horario[0] >= hora.horario[1] ? (
                      <span className="text-red-600 text-sm -mt-3 ">
                        Horario Incorrecto
                      </span>
                    ) : null}
                    {hora.horario[0] >= hora.horario[1]
                      ? (disabledSubmitCitas = true)
                      : (disabledSubmitCitas = disabledSubmitCitas)}
                    {Viernes[index].horario[2] === true ? (
                      <div className="flex gap-2">
                        <MobileTimePicker
                          label="Desde"
                          disabled={!hora.horario[2]}
                          className="w-[70px] bg-white"
                          value={hora.horario[0]}
                          renderInput={(params) => <TextField {...params} />}
                          ampm={false}
                          onChange={(newValue) => {
                            setViernes([
                              ...Viernes.slice(0, index),
                              {
                                horario: [newValue, hora.horario[1], true],
                              },
                              ...Viernes.slice(index + 1),
                            ]);
                            setViernesString([
                              ...ViernesString.slice(0, index),
                              {
                                desde: stringyDate(newValue["$H"])
                                  .toString()
                                  .concat(":")
                                  .concat(
                                    stringyDate(newValue["$m"]).toString()
                                  ),
                                hasta: stringyDate(hora.horario[1]["$H"])
                                  .toString()
                                  .concat(":")
                                  .concat(
                                    stringyDate(
                                      hora.horario[1]["$m"]
                                    ).toString()
                                  ),
                              },
                              ...ViernesString.slice(index + 1),
                            ]);
                          }}
                          minutesStep={5}
                          minTime={dayjs("2014-08-18T08:00:00")}
                          maxTime={dayjs("2014-08-18T16:45:00")}
                        />
                        <MobileTimePicker
                          label="Hasta"
                          disabled={!hora.horario[2]}
                          className="w-[70px] bg-white"
                          onChange={(newValue) => {
                            setViernes([
                              ...Viernes.slice(0, index),
                              {
                                horario: [hora.horario[0], newValue, true],
                              },
                              ...Viernes.slice(index + 1),
                            ]);
                            setViernesString([
                              ...ViernesString.slice(0, index),
                              {
                                desde: stringyDate(hora.horario[0]["$H"])
                                  .toString()
                                  .concat(":")
                                  .concat(
                                    stringyDate(
                                      hora.horario[0]["$m"]
                                    ).toString()
                                  ),
                                hasta: stringyDate(newValue["$H"])
                                  .toString()
                                  .concat(":")
                                  .concat(
                                    stringyDate(newValue["$m"]).toString()
                                  ),
                              },
                              ...ViernesString.slice(index + 1),
                            ]);
                          }}
                          value={Viernes[index].horario[1]}
                          renderInput={(params) => <TextField {...params} />}
                          ampm={false}
                          minutesStep={5}
                          minTime={hora.horario[0]}
                          maxTime={dayjs("2014-08-18T17:00:00")}
                        />
                      </div>
                    ) : null}
                  </>
                ))}
              <button
                className="flex"
                onClick={() =>
                  addHorario(
                    setViernes,
                    Viernes,
                    setViernesString,
                    ViernesString
                  )
                }
              >
                <img src={addIcon} alt="edit"></img>
                <span className="ml-2 text-[#0061dd]">Añadir Horas</span>
              </button>
            </div>
          </div>
        </div>
      </LocalizationProvider>
      <button
        disabled={disabledSubmitCitas}
        onClick={handleSubmitCitas}
        className="flex mx-auto my-5 bg-[#0061dd] disabled:bg-[#0061dd]/50 text-white p-2 rounded-md shadow-md"
      >
        Guardar Cambios
      </button>
    </div>
  );
}
