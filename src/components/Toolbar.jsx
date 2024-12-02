import { useState } from "react";
import { BiText } from "react-icons/bi";

const Toolbar = ({ texts, onStyleChange, onAddText }) => {
  const [selectedId, setSelectedId] = useState(null);
  const handleSelectChange = (e) => setSelectedId(parseInt(e.target.value, 10));
  const selectedText = texts.find((text) => text.id === selectedId);

  return (
    <>
      <div className="p-4 bg-gray-100 border-t flex items-center justify-between flex-wrap gap-4 font-outfit">
        <select
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4E8C59]"
          onChange={handleSelectChange}
          value={selectedId || ""}
        >
          <option value="" disabled>
            Select Text
          </option>
          {texts.map(({ id, text }) => (
            <option key={id} value={id}>
              {text}
            </option>
          ))}
        </select>

        {selectedText && (
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 ">
              Font Size:
              <input
                type="number"
                value={selectedText.fontSize || 16}
                min="10"
                max="72"
                className="w-16 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4E8C59]"
                onChange={(e) =>
                  onStyleChange(selectedId, {
                    fontSize: parseInt(e.target.value, 10),
                  })
                }
              />
            </label>

            <button
              className={`px-4 py-2 font-bold rounded ${
                selectedText.isBold
                  ? "bg-[#4E8C59] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() =>
                onStyleChange(selectedId, { isBold: !selectedText.isBold })
              }
            >
              B
            </button>

            <button
              className={`px-4 py-2 italic rounded ${
                selectedText.isItalic
                  ? "bg-[#4E8C59] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() =>
                onStyleChange(selectedId, { isItalic: !selectedText.isItalic })
              }
            >
              I
            </button>

            <button
              className={`px-4 py-2 underline rounded ${
                selectedText.isUnderlined
                  ? "bg-[#4E8C59] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() =>
                onStyleChange(selectedId, {
                  isUnderlined: !selectedText.isUnderlined,
                })
              }
            >
              U
            </button>

            <select
              className="p-2 border w-20 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4E8C59]"
              onChange={(e) =>
                onStyleChange(selectedId, { fontFamily: e.target.value })
              }
              value={selectedText.fontFamily || "font-outfit"}
            >
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
              <option value="Verdana">Verdana</option>
            </select>
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-100 border-t flex items-center justify-center">
        <button
          className="flex items-center font-outfit gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-[#4E8C59] hover:text-white focus:outline-none focus:ring-2 focus:ring-green-900"
          onClick={onAddText}
        >
          <BiText className="text-xl " /> Add Text
        </button>
      </div>
    </>
  );
};

export default Toolbar;
