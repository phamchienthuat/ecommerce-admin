import React, { useState } from 'react';
import vi from '../images/flag/vi.svg';
import en from '../images/flag/en.svg';
import { useTranslation } from 'react-i18next';

// Sample flag data
const flags = [
  { code: 'EN', name: 'EN', emoji: en, value: 'en' },
  { code: 'VI', name: 'VI', emoji: vi, value: 'vi' },
];

const FlagSelector: React.FC = () => {
  const [selectedFlag, setSelectedFlag] = useState<string>(flags[0].code); // Mặc định chọn flag đầu tiên
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Hàm xử lý chọn flag và thay đổi ngôn ngữ
  const handleSelectFlag = (flagCode: string) => {
    const selectedLang = flags.find((flag) => flag.code === flagCode)?.value;
    setSelectedFlag(flagCode);
    setIsOpen(false);

    if (selectedLang) {
      handChangeLanguage(selectedLang); // Thay đổi ngôn ngữ
    }
  };

  // Hàm thay đổi ngôn ngữ sử dụng i18n
  const handChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-between items-center w-full rounded border-[0.5px] border-stroke px-3 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none dark:border-strokedark dark:bg-meta-4"
          onClick={toggleDropdown}
        >
          <img
            src={flags.find((flag) => flag.code === selectedFlag)?.emoji}
            alt="flag"
            className="w-6 h-6"
          />
          <svg
            className={`hidden fill-current sm:block ml-2`}
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
              fill=""
            />
          </svg>{' '}
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-25 rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5 dark:border-strokedark dark:bg-boxdark">
          <div className="">
            {flags.map((flag) => (
              <button
                key={flag.code}
                onClick={() => handleSelectFlag(flag.code)}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 border-stroke border-b hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              >
                <img
                  src={flag.emoji}
                  alt={`${flag.name} flag`}
                  className="mr-2 w-6 h-6"
                />
                {flag.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlagSelector;
