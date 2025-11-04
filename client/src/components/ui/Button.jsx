export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`inline-block flex-1 text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-4 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 font-black text-lg shadow-lg hover:shadow-xl ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
