import axios from "axios";
import { getDataColegios,getAcreCom } from "./ComparadorSlice";
import Swal from "sweetalert2";
import SwalProp from "../exports/SwalProp";
export const getDataSchools =({ id }) =>
  (dispatch) => {
    try {
      axios
        .get(`/colegios/${id}`)
        .then((res) => dispatch(getDataColegios(res.data)))
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

    // dispatch(getDataColegios(colegio));
  };

export const getAcreditacionesComparador = (id) => (dispatch) => {
  try {
    axios

      .get(`/colegios/afiliacion/${id}`)
      .then((res) => {
        console.log(res.data);
        dispatch(getAcreCom(res.data));
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
};
