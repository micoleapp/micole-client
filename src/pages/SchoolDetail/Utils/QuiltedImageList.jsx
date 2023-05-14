function QuiltedImageList({ firstImage, gallery, setImage, setImages }) {
    return (
      <div className="w-full px-4">
        <img
          src={firstImage}
          alt=""
          onClick={() => setImage(firstImage)}
          className="cursor-pointer rounded-md h-24"
        />
        <div className="flex gap-5 mt-2 overflow-x-scroll w-full pb-2">
          {gallery?.map((item, index) => (
            <img
              key={index}
              src={item}
              className="cursor-pointer z-25 object-cover h-24 rounded-md"
              onClick={() => setImages({ open: true, src: gallery })}
            />
          ))}
        </div>
      </div>
    );
  }


  export default QuiltedImageList