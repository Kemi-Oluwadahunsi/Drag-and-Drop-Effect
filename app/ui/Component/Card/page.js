'use client';
import Image from "next/image";
import React from "react";

const Card = ({
  id,
  title,
  image,
  subLocation,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleDragEnd,
  handleTouchStart,
  handleTouchEnd,
  isDragging,
  isDraggedOver,
}) => {
  return (
    <div
      id={`card-${id}`}
      className={`card items-center p-4 pl-0 sm:pl-6 lg:pl-8 flex gap-4 lg:gap-8  cursor-pointer ${
        isDragging ? " bg-[#F4F5F6]" : "bg-white"
      } ${isDraggedOver ? "border-b-2 border-[#1E9BF0]" : ""}`}
      draggable
      onDragStart={(e) => handleDragStart(e, id, title, image)}
      onDragOver={(e) => handleDragOver(e, id)}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
      onTouchStart={(e) => handleTouchStart(e, id, title, image)}
      onTouchEnd={handleTouchEnd}
    >
      <div className="">
        <Image
          src={image}
          alt={title}
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
          width={100}
          height={100}
        />
      </div>

      <div className="flex flex-col">
        <h2 className="font-primary text-[#292B36] font-medium text-base sm:text-[1.2rem] lg:text-[1.3rem] xl:text-[1.5rem]">
          {title}
        </h2>

        <div className="flex gap-2 items-center">
          <div>
            <Image
              src={`/images/location.png`}
              alt={title}
              className="w-[100%] h-6 sm:w-[100%] sm:h-8 lg:w-[100%] lg:h-8"
              width={20}
              height={20}
            />
          </div>

          <p className="text-[#A8A9AE] font-secondary text-lg pt-2">
            {subLocation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
