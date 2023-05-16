import React, { useState } from "react";
import { useSelector } from "react-redux";
import QuiltedImageList from "../Utils/QuiltedImageList";

export default function GaleriaSD() {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState({
    open: false,
    src: [],
  });
  const { oneSchool } = useSelector((state) => state.schools);

  return (
    <>
     <div className="p-5 bg-white flex flex-col gap-5 rounded-md shadow-md w-full">
      <h2 className="font-semibold  text-[#0D263B] pl-2 text-[2.4vh]">
        Galería
      </h2>
      {oneSchool.hasOwnProperty("galeria_fotos") &&
        oneSchool.galeria_fotos !== null &&
        JSON.parse(oneSchool.galeria_fotos).length > 0 && (
          <QuiltedImageList
            firstImage={oneSchool.primera_imagen}
            gallery={JSON.parse(oneSchool.galeria_fotos)}
            setImage={setImage}
            setImages={setImages}
          />
        )}
      <div
        className={`fixed top-0 left-0 z-50 bg-black/90 w-full h-full ${
          image ? "block" : "hidden"
        }`}
      >
        <button
          onClick={() => setImage(null)}
          className="absolute top-2 right-4 z-[100] text-white"
        >
          Atras
        </button>
        <img
          src={image}
          alt=""
          className="absolute border-4 top-1/2 left-1/2 -translate-x-1/2 rounded-md -translate-y-1/2 block max-w-[80%] max-h-[80%] object-cover"
        />
      </div>
    </div>
      {oneSchool.video_url?.length > 0 && (
        <div className=" bg-white flex flex-col gap-5 rounded-md w-full">
          <h2 className="font-semibold  text-[#0D263B] text-[2.4vh]">
            Video
          </h2>

          <video className="w-full h-[300px] lg:h-[400px]" controls>
            <source src={oneSchool.video_url} type="video/mp4" />
          </video>
        </div>
      )}
    
    </>
   
  );
}
