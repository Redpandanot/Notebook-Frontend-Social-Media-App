import { useState } from "react";
import { PhotoObject } from "./FriendAndRequest/type";

interface propType {
  photos: PhotoObject[];
}

const Carousel = ({ photos }: propType) => {
  const [currImageIndex, setCurrImageIndex] = useState<number>(0);

  const handlePreviousImage = () => {
    if (currImageIndex === 0) {
      setCurrImageIndex(photos.length - 1);
    } else setCurrImageIndex((prev) => prev - 1);
  };

  const handleNextImage = () => {
    if (currImageIndex === photos.length - 1) {
      setCurrImageIndex(0);
    } else setCurrImageIndex((prev) => prev + 1);
  };

  return (
    <div className="carousel md:w-[400px] sm:w-full h-[400px]">
      <div
        className="carousel-item relative w-full"
        // style={{ backgroundImage: `url(${photo.url})` }}
      >
        <img
          src={photos[currImageIndex].url}
          className="w-full object-contain"
        />
      </div>
      {photos.length > 1 && (
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <div
            onClick={handlePreviousImage}
            className="btn btn-circle bg-primary opacity-50"
          >
            ❮
          </div>
          <div
            onClick={handleNextImage}
            className="btn btn-circle bg-primary opacity-50"
          >
            ❯
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
