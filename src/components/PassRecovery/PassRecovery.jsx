import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import style from "../PassRecovery/PassRecovery.module.css"
import Logo from "../../assets/logoPayment.png";
import { login } from "../../redux/AuthActions";
import { useDispatch } from "react-redux";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { RecoveryContext } from "../LoginDistributor/LoginDistributor";
import SwalProp from "../../exports/SwalProp";
import axios from "axios";



export default function PassRecovery({ mail}) {
  const dispatch = useDispatch();
  const { email, otp, setPage } = useContext(RecoveryContext);
  const [timerCount, setTimer] = React.useState(60);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);

  function resendOTP() {
    if (disable) return;
    axios
      .post("http://localhost:5000/send_recovery_email", {
        OTP: otp,
        recipient_email: email,
      })
      .then(() => setDisable(true))
      .then(() => alert("A new OTP has succesfully been sent to your email."))
      .then(() => setTimer(60))
      .catch(console.log);
  }

  function verfiyOTP() {
    if (parseInt(OTPinput.join("")) === otp) {
      setPage("reset");
      return;
    }
    SwalProp({
      status: false,
      title: "Ups!...",
      text: "Código incorrecto",
    });
    return;
  }

  React.useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); 
    return () => clearInterval(interval);
  }, [disable]);
 
  

    const inputs = Array.prototype.slice.call(
      document.querySelectorAll('form input')
    );
    console.log(inputs)
    
    inputs.forEach((input) => {
      input.addEventListener('keyup', (event) => {
        console.log("hayaaaaaaaaa")
        
        if (input.value != ""){
              const num = Number(event.key);
     
      if (input.value.length >= input.maxLength) {  
            event.preventDefault();
            focusNext();}
          
        
     } });
    });
    
    function focusNext() {
      const currInput = document.activeElement;
      const currInputIndex = inputs.indexOf(currInput);
      const nextinputIndex =
        (currInputIndex + 1) % inputs.length;
      const input = inputs[nextinputIndex];
      input.focus();
    }
          

  

  

  

  return (
    <div>
      <div  className={style.Form}>
        <div className={style.img_div}>
          <img src={Logo} />
          <p>Hemos enviado un código de autenticación a tu correo,<br></br> por favor ingresalo en los campos de abajo</p>
        </div>
        
        <form>
              <div className="flex flex-col space-y-8">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  <div className="w-16 h-16 ">
                    <input
                      maxLength="1"
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-400 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="number"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([
                          e.target.value,
                          OTPinput[1],
                          OTPinput[2],
                          OTPinput[3],
                        ])
                      }
                    ></input>
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      maxLength="1"
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-400 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="number"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([
                          OTPinput[0],
                          e.target.value,
                          OTPinput[2],
                          OTPinput[3],
                        ])
                      }
                    ></input>
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      maxLength="1"
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-400 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([
                          OTPinput[0],
                          OTPinput[1],
                          e.target.value,
                          OTPinput[3],
                        ])
                      }
                    ></input>
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      maxLength="1"
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-400 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([
                          OTPinput[0],
                          OTPinput[1],
                          OTPinput[2],
                          e.target.value,
                        ])
                      }
                    ></input>
                  </div>
                </div>

                <div className="flex flex-col space-y-5">
                <button  onClick={() => verfiyOTP()}  className="hover:shadow-lg shadow-black duration-300">
                    INGRESAR CODIGO
                </button>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>No recibiste el código?</p>{"  "}
                    <a
                      className="flex flex-row "
                      style={{
                        color: disable ? "gray" : "blue",
                        cursor: disable ? "none" : "pointer",
                        textDecorationLine: disable ? "none" : "underline",
                      }}
                      onClick={() => resendOTP()}
                    >
                      {disable ? `Reenviando en ${timerCount}s` : "Reenviar código"}
                    </a>
                  </div>
                </div>
              </div>
            </form>
        
       
      </div>
     
      
      
      
    </div>
  );
}