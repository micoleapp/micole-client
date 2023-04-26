import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
export const comparadorSlice = createSlice({
  name: "comparador",
  initialState: {
    arrColegios: [],
    Afilia:[],
    Infras:[]
  },
  reducers: {
    getDataColegios: (state, action) => {
      console.log(action.payload)
      const data = Object.assign({}, ...action.payload)
      console.log(data)
      if (state.arrColegios.length < 3) {
        state.arrColegios = [...state.arrColegios, data];
      } else {
        console.log("oli")
      }
    },
    getAcreCom: (state, action) => {
      console.log(action.payload)
      const data = Object.assign({}, ...action.payload)
      console.log(data)
        state.Afilia = [...state.Afilia,data];
      
    },
  },
});

export const { getDataColegios,getAcreCom } = comparadorSlice.actions;

export default comparadorSlice.reducer;
