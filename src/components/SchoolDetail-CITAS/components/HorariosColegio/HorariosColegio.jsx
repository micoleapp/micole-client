import React, { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function HorariosColegio({ diaSelecionado, sendDateHs }) {
  const [horarioColegio, setHorarioColegio] = useState("");
  // const [validacion, setValidacion] = useState(false)
  const handleChangeHora = (event) => {
    setHorarioColegio(event.target.value);
  };
  const handlerInfo = (e, date, time, validacion) => {
    // setValidacion(true)
    const dateSelected = diaSelecionado && Object.assign({}, ...diaSelecionado);
    const objDate = dateSelected?.date;
    console.log(date);
    let infoDiaHora = {
      time: time,
      date: objDate,
      select: validacion,
    };

    sendDateHs(infoDiaHora);
  };

  // Se convierte el arr  diaSelecionado a un obj y accedemos a la propiedad time que es un array

  // Se hace esta comprobación ya que hay colegios con la propiedad time en forma de obj

  const fnParse = () => {
    const arrHorarios = diaSelecionado && Object.assign({}, ...diaSelecionado);
    const objHorarios = arrHorarios?.time;

    if (Array.isArray(objHorarios)) {
      return arrHorarios?.time;
    } else {
      const newArrHorarios = [];
      newArrHorarios.push(arrHorarios?.time);

      return newArrHorarios;
    }
  };
  const arrDefHorarios = fnParse();

  return (
    <>
      <div className="flex fle-row items-center">
        <p className="text-[1.8vh]">Escoger horario</p>
        <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
          <InputLabel id="demo-select-small"> Seleccionar hora</InputLabel>

          <Select
            sx={{
              border: "none",
              outline: "none",
              fontSize: "2vh",
              width: "100%",
              minWidth: "20vh",
            }}
            labelId="demo-select-small"
            id="demo-select-small"
            value={horarioColegio}
            label={"Seleccionar hora"}
            onChange={handleChangeHora}
          >
            {diaSelecionado ? (
              arrDefHorarios?.map((ele) => {
                console.log(ele);
                return (
                  <MenuItem
                    key={ele.desde}
                    onClick={(e) =>
                      handlerInfo(e, diaSelecionado.date, ele.desde, true)
                    }
                    value={ele.desde}
                  >
                    {ele.desde}/{ele.hasta}
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem>Seleccionar un dia</MenuItem>
            )}
          </Select>
        </FormControl>
      </div>
    </>
  );
}

export default HorariosColegio;
