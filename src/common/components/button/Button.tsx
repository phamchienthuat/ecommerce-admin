import React from 'react';

// Định nghĩa interface cho props của Button
interface ButtonProps {
    text: string;                // Nội dung văn bản trên nút
    onClick: () => void;         // Hàm được gọi khi nút được nhấn
    type?: 'create' | 'edit' | 'update' | 'remove' | 'cancel' | 'back' | 'default'; // Loại button
    disabled?: boolean;          // Nút có bị vô hiệu hóa hay không
    visible?: boolean;           // Nút có hiển thị hay không
    className?: string;          // Các class CSS bổ sung nếu cần
    icon?: React.ReactNode;  
  }

// Định nghĩa các className tương ứng với mỗi loại button
const buttonTypes = {
  create: 'inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10',
  edit: 'btn-edit',
  update: 'inline-flex items-center justify-center rounded-md bg-orange-600 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10',
  remove: 'inline-flex items-center justify-center rounded-md bg-red-600 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10',
  cancel: 'btn-cancel',
  back: 'btn-back',
  default: 'inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10', 
};

const Button: React.FC<ButtonProps> = ({ text, onClick, type = 'default', disabled = false, visible = true, className = '', icon}) => {
  // Không hiển thị nút nếu visible là false
  if (!visible) return null;

  // Lấy className tương ứng với type, nếu không có thì sử dụng 'default'
  const buttonClass = buttonTypes[type] || buttonTypes.default;

  return (
    <button
      className={`btn ${buttonClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      <span>{text}</span>
    </button>
  );
};

export default Button;
