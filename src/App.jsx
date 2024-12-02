import React, { useState } from "react";
import Header from "./components/Header";
import Canvas from "./components/Canvas";
import Toolbar from "./components/Toolbar";

function App() {
  const [texts, setTexts] = useState([]);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  // Add new text
  const handleAddText = () => {
    const newText = {
      id: texts.length + 1,
      text: `New Text ${texts.length + 1}`,
      x: 100,
      y: 100,
      fontSize: 16,
      isBold: false,
      isItalic: false,
      isUnderlined: false,
      fontFamily: "Outfit",
    };
    setUndoStack([...undoStack, texts]);
    setRedoStack([]);
    setTexts([...texts, newText]);
  };

  // Undo action
  const handleUndo = () => {
    if (undoStack.length > 0) {
      const previousState = undoStack[undoStack.length - 1];
      setUndoStack(undoStack.slice(0, -1));
      setRedoStack([texts, ...redoStack]);
      setTexts(previousState);
    }
  };

  // Redo action
  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[0];
      setRedoStack(redoStack.slice(1));
      setUndoStack([...undoStack, texts]);
      setTexts(nextState);
    }
  };

  // Handle drag-and-drop
  const handleDrag = (id, x, y) => {
    setUndoStack([...undoStack, texts]);
    setRedoStack([]);
    setTexts((prevTexts) =>
      prevTexts.map((text) => (text.id === id ? { ...text, x, y } : text))
    );
  };

  // Handle text edit
  const handleEdit = (id, newText) => {
    setUndoStack([...undoStack, texts]);
    setRedoStack([]);
    setTexts((prevTexts) =>
      prevTexts.map((text) => (text.id === id ? { ...text, text: newText } : text))
    );
  };

  // Handle style changes
  const handleStyleChange = (id, updatedProperties) => {
    setUndoStack([...undoStack, texts]);
    setRedoStack([]);
    setTexts((prevTexts) =>
      prevTexts.map((text) =>
        text.id === id ? { ...text, ...updatedProperties } : text
      )
    );
  };

  return (
    <div className="h-screen flex flex-col">
      <Header onUndo={handleUndo} onRedo={handleRedo} />
      <div className="flex-grow">
        <Canvas texts={texts} onDrag={handleDrag} onEdit={handleEdit} />
      </div>
      <Toolbar texts={texts} onStyleChange={handleStyleChange} onAddText={handleAddText} />
    </div>
  );
}

export default App;
