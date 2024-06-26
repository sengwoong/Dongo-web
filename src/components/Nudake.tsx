import { FC, useEffect, useRef } from 'react'
import throttle from 'lodash/throttle'
import gsap from 'gsap'


import image1 from '../../public/img/boling.png'
import image2 from '../../public/img/save.png'
import image3 from '../../public/img/search.png'
import { drawImageCenter, getAngle, getDistance, getScrupedPercent } from '../../utils/utils';

const Nudake: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let canvasWidth: number, canvasHeight: number
    const canvas = canvasRef.current as HTMLCanvasElement
    const canvasParent = canvas.parentNode as HTMLElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    const imageSrcs = [image1, image2, image3]
    const loadedImages: HTMLImageElement[] = []
    let currIndex = 0
    let prevPos: { x: number, y: number } | null = null
    let isChanging = false

    function resize() {
      canvasWidth = canvasParent.clientWidth
      canvasHeight = canvasParent.clientHeight
      canvas.style.width = canvasWidth + 'px'
      canvas.style.height = canvasHeight + 'px'
      canvas.width = canvasWidth
      canvas.height = canvasHeight

      preloadImages().then(() => drawImage())
    }

    function preloadImages() {
      return new Promise<void>((resolve, reject) => {
        let loaded = 0
        imageSrcs.forEach(src => {
          const img = new Image()
          img.src = src
          img.onload = () => {
            loaded += 1
            loadedImages.push(img)
            if (loaded === imageSrcs.length) return resolve()
          }
        })
      })
    }

    function drawImage() {
      isChanging = true
      const image = loadedImages[currIndex]
      const firstDrawing = ctx.globalCompositeOperation === 'source-over'

      gsap.to(canvas, {
        opacity: 0, duration: firstDrawing ? 0 : 1, onComplete: () => {
          canvas.style.opacity = '1'
          ctx.globalCompositeOperation = 'source-over'
          drawImageCenter(canvas, ctx, image)

          const nextImage = imageSrcs[(currIndex + 1) % imageSrcs.length]
          canvasParent.style.backgroundImage = `url(${nextImage})`
          prevPos = null

          isChanging = false
        }
      })
    }

    function onMousedown(e: MouseEvent) {
      if (isChanging) return
      canvas.addEventListener('mouseup', onMouseUp)
      canvas.addEventListener('mouseleave', onMouseUp)
      canvas.addEventListener('mousemove', onMouseMove)
      prevPos = { x: e.offsetX, y: e.offsetY }
    }

    function onMouseUp() {
      canvas.removeEventListener('mouseup', onMouseUp)
      canvas.removeEventListener('mouseleave', onMouseUp)
      canvas.removeEventListener('mousemove', onMouseMove)
    }

    function onMouseMove(e: MouseEvent) {
      if (isChanging) return
      drawCircles(e)
      checkPercent()
    }

    function drawCircles(e: MouseEvent) {
      const nextPos = { x: e.offsetX, y: e.offsetY }
      if (!prevPos) prevPos = nextPos
      const dist = getDistance(prevPos, nextPos)
      const angle = getAngle(prevPos, nextPos)

      for (let i = 0; i < dist; i++) {
        const x = prevPos.x + Math.cos(angle) * i
        const y = prevPos.y + Math.sin(angle) * i

        ctx.globalCompositeOperation = 'destination-out'
        ctx.beginPath()
        ctx.arc(x, y, canvasWidth / 15, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
      }

      prevPos = nextPos
    }

    const checkPercent = throttle(() => {
      const percent = getScrupedPercent(ctx, canvasWidth, canvasHeight)
      if (percent > 50) {
        currIndex = (currIndex + 1) % imageSrcs.length
        drawImage()
      }
    }, 500)

    canvas.addEventListener('mousedown', onMousedown)
    window.addEventListener('resize', resize)
    resize()

    return () => {
      canvas.removeEventListener('mousedown', onMousedown)
      window.removeEventListener('resize', resize)
    }
  })

  return (
    <div className="w-full h-[60%] sm:h-[80%] md:h-[80%] flex items-center justify-center relative bg-no-repeat bg-cover bg-center" >
    <canvas ref={canvasRef} className='absolute' />
  </div>
  )
}

export default Nudake
