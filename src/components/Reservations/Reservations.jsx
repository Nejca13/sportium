'use client'
import { useState } from 'react'
import styles from './Reservations.module.css'
import StepOne from './StepReservation/StepOne'
import StepTwo from './StepReservation/StepTwo'

const Reservations = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.container_form}>
          {step === 1 && (
            <StepOne
              setStep={setStep}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
          {step === 2 && (
            <StepTwo
              setStep={setStep}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Reservations
