'use client'
import { useEffect, useState } from 'react'
import styles from './Inicio.module.css'
import image_one from '@/assets/images/Slider_image/paleta.webp'
import image_two from '@/assets/images/Slider_image/cancha.webp'
import image_three from '@/assets/images/Slider_image/hombre.webp'
import FormReservas from './FormReservas/FormReservas'

const Inicio = () => {
  const images = [image_three, image_one, image_two]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(false)

  useEffect(() => {
    const preloadImages = (imageArray) => {
      return Promise.all(
        imageArray.map((image) => {
          return new Promise((resolve) => {
            const img = new Image()
            img.src = image.src
            img.onload = resolve
          })
        })
      )
    }

    preloadImages(images).then(() => {
      setIsTransitionEnabled(true)
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
      }, 6000)

      return () => clearInterval(intervalId)
    })
  }, [])
  return (
    <section className={styles.container}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`${styles.image} ${
            currentImageIndex === index ? styles.visible : ''
          }`}
          style={{ backgroundImage: `url(${image.src})` }}
        />
      ))}
      <div className={styles.content}>
        <div className={styles.title}>
          <h1>Sportium Canchas de Futbol & Padel.</h1>
          <p>Encuentra las canchas disponibles y reservalas al instante.</p>
        </div>
        <FormReservas />
      </div>
    </section>
  )
}

export default Inicio
