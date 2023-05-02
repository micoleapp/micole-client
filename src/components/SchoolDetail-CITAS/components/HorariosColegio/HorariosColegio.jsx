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

    let infoDiaHora = {
      time: time,
      date: date,
      select: validacion,
    };

    sendDateHs(infoDiaHora);
  };

  // Se convierte el arr  diaSelecionado a un obj y accedemos a la propiedad time que es un array
  const arrHorarios = diaSelecionado&& Object.assign({}, ...diaSelecionado);
  // console.log(arrHorarios.time);
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
        <InputLabel id="demo-select-small">Horarios</InputLabel>

        <Select
          sx={{ border: "none", outline: "none", fontSize: "2vh" }}
          labelId="demo-select-small"
          id="demo-select-small"
          value={horarioColegio}
          label={"Horarios"}
          onChange={handleChangeHora}
        >
          {arrHorarios&&arrHorarios?.time?.map((ele) => {
            console.log(diaSelecionado);
            return (
              <MenuItem
                key={ele.desde}
                onClick={(e) => handlerInfo(e, arrHorarios.date, ele.desde, true)}
                value={ele.desde}
              >
                {ele.desde}/{ele.hasta}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
}

export default HorariosColegio;
