import React from 'react';

const Textarea = ({ value, onChange, placeholder = '', className = '', ...props }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none ${className}`}
      {...props}
    />
  );
};

export default Textarea;
