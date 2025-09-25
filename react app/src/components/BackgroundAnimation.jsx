import { useEffect, useRef } from 'react'
import p5 from 'p5'

const BackgroundAnimation = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const sketch = (p) => {
      let waves = []
      
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight)
        
        // Create wave objects
        for (let i = 0; i < 3; i++) {
          waves.push({
            y: p.height * (0.3 + i * 0.2),
            amplitude: 50 + i * 20,
            frequency: 0.01 + i * 0.005,
            phase: i * p.PI / 3,
            speed: 0.02 + i * 0.01,
            color: [255, 107, 107, 30 - i * 10]
          })
        }
      }
      
      p.draw = () => {
        p.clear()
        
        waves.forEach(wave => {
          p.fill(wave.color[0], wave.color[1], wave.color[2], wave.color[3])
          p.noStroke()
          
          p.beginShape()
          p.vertex(0, p.height)
          
          for (let x = 0; x <= p.width; x += 10) {
            const y = wave.y + p.sin(x * wave.frequency + wave.phase) * wave.amplitude
            p.vertex(x, y)
          }
          
          p.vertex(p.width, p.height)
          p.endShape(p.CLOSE)
          
          wave.phase += wave.speed
        })
      }
      
      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
      }
    }

    const p5Instance = new p5(sketch, containerRef.current)

    return () => {
      p5Instance.remove()
    }
  }, [])

  return <div ref={containerRef} id="background-animation" />
}

export default BackgroundAnimation