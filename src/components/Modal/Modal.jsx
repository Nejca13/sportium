import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

const Modal = ({ isModalOpen, onClose, children, maxWidth = '500px' }) => {
  if (!isModalOpen) return null
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return createPortal(
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} style={{ maxWidth: maxWidth }}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  )
}

export default Modal
