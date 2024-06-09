"use client";
// import Image from "next/image";
// import data from "./ui/data";

// const HomePage = () => {
//   return (
//     <div className="flex items-center justify-center">
//       <div className="w-[40%] border px-8 py-[3rem] flex flex-col gap-8">
//         {data.map((item) => (
//           <div
//             key={item.id}
//             className="w-full flex gap-8 items-center cursor-pointer"
//           >
//             <div>
//               <Image
//                 src={`/images/${item.img}`}
//                 alt="scotland"
//                 title="scotland island image"
//                 width={120}
//                 height={120}
//               />
//             </div>

//             <div className="flex flex-col gap-2">
//               <h3 className="font-primary text-[#292B36] font-medium text-[1.5rem]">
//                 {item.location}
//               </h3>
//               <div className="flex gap-2 items-center">
//                 <Image
//                   src={`/images/location.png`}
//                   alt="location"
//                   title="location icon"
//                   width={20}
//                   height={10}
//                 />
//                 <p className="text-[#A8A9AE] font-secondary text-lg pt-2">
//                   {item.subLocation}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default HomePage;

"use client";
import Head from "next/head";
import Card from "./ui/Component/Card/page";
import { useState } from "react";
import data from "./ui/data";

export default function Home() {
  // const initialCards = [
  //   { id: 1, title: "Card 1", image: "/images/scotland.png", subLocation: "" },
  //   { id: 2, title: "Card 2", image: "/images/charles.png", subLocation: "" },
  //   { id: 3, title: "Card 3", image: "/images/bridgeClimb.png", subLocation: "" },
  //   { id: 4, title: "Card 4", image: "/images/scotlandIsland.png", subLocation: "" },
  //   { id: 5, title: "Card 5", image: "/images/clambar.png" },
  //   { id: 6, title: "Card 6", image: "/images/vividFestival.png", subLocation: "" },
  // ];

  const [cards, setCards] = useState(data);
  const [draggingCardId, setDraggingCardId] = useState(null);
  const [dragImage, setDragImage] = useState(null);
   const [dragOverCardId, setDragOverCardId] = useState(null);

  const handleDragStart = (e, id, title, image) => {
    setDraggingCardId(id);
    const dragImage = document.createElement("div");
    dragImage.id = "drag-image";
    dragImage.style.position = "absolute";
    dragImage.style.width = "250px";
    dragImage.style.height = "80px";
    dragImage.style.display = "flex";
    dragImage.style.alignItems = "center";
    dragImage.style.justifyContent = "start";
    dragImage.style.backgroundColor = "white";
    dragImage.style.border = "1px solid rgba(0,0,0,0.1)";
    dragImage.style.borderRadius = "8px";
     dragImage.style.paddingLeft = "8px";
    dragImage.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
    dragImage.style.pointerEvents = "none";
    dragImage.innerHTML = `
      <img src="${image}" alt="${title}" class="w-8 h-8 rounded-sm" />
      <h2 class="text-[0.9rem] font-bold ml-2">${title}</h2>
    `;
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 50, 25);
    setDragImage(dragImage);

    const moveDragImage = (event) => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 769) {
        dragImage.style.top = `${event.pageY - 25}px`;
        dragImage.style.left = `${event.pageX - 25}px`; // Adjust the position for smaller screens
      } else {
        dragImage.style.top = `${event.pageY - 25}px`;
        dragImage.style.left = `${event.pageX - 50}px`;
      }
    };

    document.addEventListener("dragover", moveDragImage);

    e.target.addEventListener(
      "dragend",
      () => {
        document.removeEventListener("dragover", moveDragImage);
        if (dragImage) {
          dragImage.remove();
          setDragImage(null);
        }
      },
      { once: true }
    );
  };

  const handleDragEnd = () => {
    if (dragImage) {
      dragImage.remove();
      setDragImage(null);
    }
    setDraggingCardId(null);
    setDragOverCardId(null);
  };

  const handleDragOver = (e, id) => {
    e.preventDefault();
     e.dataTransfer.dropEffect = "move";
    if (id === draggingCardId) return;
    setDragOverCardId(id);
  };

  const handleDrop = (e, id) => {
    e.preventDefault();
    if (id === draggingCardId) return;

    const newCards = [...cards];
    const draggedIndex = newCards.findIndex(
      (card) => card.id === draggingCardId
    );
    const targetIndex = newCards.findIndex((card) => card.id === id);

    const [draggedCard] = newCards.splice(draggedIndex, 1);
    newCards.splice(targetIndex, 0, draggedCard);

    setCards(newCards);
    handleDragEnd();
  };

  return (
    <div className="container mx-auto py-4 w-[90%] sm:w-[60%] lg:w-[50%] xl:w-[45%] bg-white my-4">
      <Head>
        <title>Drag and Drop App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="space-y-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            image={card.image}
            subLocation={card.subLocation}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
            handleDragOver={handleDragOver}
            handleDrop={(e) => handleDrop(e, card.id)}
            isDragging={draggingCardId === card.id}
            isDraggedOver={dragOverCardId === card.id}
          />
        ))}
      </div>
    </div>
  );
}

