const Alert = ({
  width = '24',
  height = '24',
  color = '#2F855A',
  className = '',
}) => (
  <svg
    stroke={color}
    fill={color}
    strokeWidth='0'
    viewBox='0 0 512 512'
    height={height}
    width={width}
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path d='M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm0 319.91a20 20 0 1 1 20-20 20 20 0 0 1-20 20zm21.72-201.15-5.74 122a16 16 0 0 1-32 0l-5.74-121.94v-.05a21.74 21.74 0 1 1 43.44 0z'></path>
  </svg>
)

export default Alert
