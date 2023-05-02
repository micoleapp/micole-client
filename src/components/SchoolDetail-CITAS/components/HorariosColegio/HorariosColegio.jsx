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
  console.log(diaSelecionado);
  // Se convierte el arr  diaSelecionado a un obj y accedemos a la propiedad time que es un array

  // Se hace esta comprobación ya que hay colegios con la propiedad time en forma de obj

  const fnParse = () => {
    const arrHorarios = diaSelecionado && Object.assign({}, ...diaSelecionado);
    const objHorarios = arrHorarios?.time;
    console.log(objHorarios);

    if (Array.isArray(objHorarios)) {
      console.log("a");
      return arrHorarios?.time;
    } else {
      const newArrHorarios = [];
      newArrHorarios.push(arrHorarios?.time);
      console.log("b");
      return newArrHorarios;
    }
  };
  const arrDefHorarios = fnParse();
  console.log(arrDefHorarios);
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
          {diaSelecionado &&
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
            })}
        </Select>
      </FormControl>
    </>
  );
}

export default HorariosColegio;
