import React from "react";
import { LuUndo2, LuRedo2 } from "react-icons/lu";

const Header = ({ onUndo, onRedo }) => {
    return (
        <header className="flex  items-center p-2 bg-gray-100 shadow justify-between font-outfit ">

            <div className="flex items-center">
                <h1 className="text-4xl font-bold text-[#4E8C59] ml-1 p-1 font-fleur">Text Canvas</h1>
            </div>

            <div className="flex items-center ">
                <button
                    className="px-4 py-2 mr-2  rounded hover:bg-gray-200 "
                    onClick={onUndo}
                ><LuUndo2 className="text-2xl"/>
                    undo
                </button>
                <button
                    className="px-4 py-2 mr-4  rounded hover:bg-gray-200"
                    onClick={onRedo}
                ><LuRedo2 className="text-2xl"/>
                    redo
                </button>

            </div>
        </header>
    );
};

export default Header;
