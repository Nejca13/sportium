const Menu = ({
  width = '35',
  height = '35',
  color = 'white',
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
    <path
      fill='none'
      strokeLinecap='round'
      strokeMiterlimit='10'
      strokeWidth='48'
      d='M88 152h336M88 256h336M88 360h336'
    ></path>
  </svg>
)

export default Menu
