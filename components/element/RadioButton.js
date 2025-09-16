function RadioButton({ status, setStatus, value, title, children }) {
  return (
    <div className="flex items-center justify-between w-36   rounded-lg px-4">
      
      <label className="   text-sm font-medium  text-gray-900 "
       htmlFor={value}>
        {children}
        {title}
      </label>
      <input
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2 "
        type="radio"
        id={value}
        value={value}
        checked={status === value}
        onChange={(e) => setStatus(e.target.value)}
      />
    </div>
  );
}

export default RadioButton;