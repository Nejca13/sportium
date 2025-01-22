const ChangePasswordIcon = ({
  width = '20',
  height = '20',
  color = 'var(--green)',
  className = '',
}) => (
  <svg
    stroke={color}
    fill='none'
    strokeWidth='2'
    viewBox='0 0 24 24'
    strokeLinecap='round'
    strokeLinejoin='round'
    height={height}
    width={width}
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path d='M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z'></path>
    <path d='M8 11v-4a4 4 0 1 1 8 0v4'></path>
    <path d='M15 16h.01'></path>
    <path d='M12.01 16h.01'></path>
    <path d='M9.02 16h.01'></path>
  </svg>
)

export default ChangePasswordIcon
