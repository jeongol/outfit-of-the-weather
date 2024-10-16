import React from "react";

interface MenuButtonProps {
  onEdit: () => void;
  onDelete: () => void;
  isMenuOpen: boolean;
}

const MenuButton = ({ onEdit, onDelete, isMenuOpen }: MenuButtonProps) => {
  return (
    <div className="relative">
      {isMenuOpen && (
        <div className="absolute w-[100px] bg-white rounded-lg z-10">
          <button
            className="w-full px-4 py-2 bg-gray-500 text-white rounded-t hover:bg-gray-600 transition"
            onClick={onEdit}
          >
            수정
          </button>
          <button
            className="w-full px-4 py-2 bg-red-500 text-white rounded-b hover:bg-red-600 transition"
            onClick={onDelete}
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuButton;
