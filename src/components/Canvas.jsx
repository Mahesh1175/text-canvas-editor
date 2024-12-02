import React, { useState } from "react";

const Canvas = ({ texts, onDrag, onEdit }) => {
  const [draggedId, setDraggedId] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleDragStart = (e, id) => {
    setDraggedId(id);
    setDragStart({ x: e.clientX, y: e.clientY });
    e.dataTransfer?.setData("id", id); 
  };

  const handleTouchStart = (e, id) => {
    const touch = e.touches[0];
    setDraggedId(id);
    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleDrag = (e) => {
    e.preventDefault();
  };

  const handleTouchMove = (e) => {
    if (!draggedId) return;

    const touch = e.touches[0];
    const dx = touch.clientX - dragStart.x;
    const dy = touch.clientY - dragStart.y;

    setDragStart({ x: touch.clientX, y: touch.clientY });

    const draggedText = texts.find((text) => text.id === draggedId);
    if (draggedText) {
      onDrag(draggedId, draggedText.x + dx, draggedText.y + dy);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const id = parseInt(e.dataTransfer?.getData("id"), 10);
    const canvasRect = e.target.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;

    onDrag(id, x, y);
    setDraggedId(null);
  };

  const handleTouchEnd = () => {
    setDraggedId(null);
  };

  return (
    <div
      className="flex-grow bg-gray-300 relative w-full h-[100%] overflow-hidden "
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {texts.map(({ id, text, x, y, fontSize, isBold, isItalic, isUnderlined, fontFamily }) => (
        <div
          key={id}
          draggable
          onDragStart={(e) => handleDragStart(e, id)}
          onTouchStart={(e) => handleTouchStart(e, id)}
          style={{
            position: "absolute",
            left: x,
            top: y,
            cursor: "grab",
            fontSize: fontSize || 16,
            fontWeight: isBold ? "bold" : "normal",
            fontFamily: fontFamily || "Arial",
          }}
          className="p-2 bg-white border shadow"
        >
          <input
            type="text"
            value={text}
            onChange={(e) => onEdit(id, e.target.value)}
            className={`border px-2 py-1 outline-none 
              ${isItalic ? "italic" : ""}
             ${isUnderlined ? "underline" : "none"}`}
          />
        </div>
      ))}
    </div>
  );
};

export default Canvas;
