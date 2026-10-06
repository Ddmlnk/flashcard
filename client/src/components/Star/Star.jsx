// client/src/components/Star/Star.jsx
function Star({ color, size = 32, className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 1C12.8 7.5 16.5 11.2 23 12C16.5 12.8 12.8 16.5 12 23C11.2 16.5 7.5 12.8 1 12C7.5 11.2 11.2 7.5 12 1Z"
        fill={color}
        stroke="rgb(46, 20, 1)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Star;
