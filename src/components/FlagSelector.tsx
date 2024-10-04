import React, { useState } from 'react';
import Viet from "../images/flag/vi.svg"

// Sample flag data
const flags = [
  { code: 'EN', name: 'EN', emoji: '🇺🇸', value: "en" },
  { code: 'VI', name: 'VI', emoji: Viet , value: "vi"},
];

const FlagSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState<string | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectFlag = (flag: string) => {
    setSelectedFlag(flag);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={toggleDropdown}
        >
          {selectedFlag ? flags.find(flag => flag.code === selectedFlag)?.emoji : 'Select a flag'} <span className="ml-2">&#9662;</span>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {flags.map(flag => (
              <button
                key={flag.code}
                onClick={() => handleSelectFlag(flag.code)}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <span className="mr-2">{flag.emoji}</span>
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
