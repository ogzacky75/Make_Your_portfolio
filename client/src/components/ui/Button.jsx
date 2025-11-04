export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-4 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 font-black text-lg shadow-lg hover:shadow-xl ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
