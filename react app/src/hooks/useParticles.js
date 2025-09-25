import { useEffect } from 'react'
import p5 from 'p5'

export const useParticles = (canvasRef) => {
  useEffect(() => {
    if (!canvasRef.current) return

    const sketch = (p) => {
      let particles = []
      const numParticles = 50

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight)
        
        // Create particles
        for (let i = 0; i < numParticles; i++) {
          particles.push({
            x: p.random(p.width),
            y: p.random(p.height),
            vx: p.random(-0.5, 0.5),
            vy: p.random(-0.5, 0.5),
            size: p.random(2, 6),
            opacity: p.random(0.1, 0.3)
          })
        }
      }

      p.draw = () => {
        p.clear()
        
        // Update and draw particles
        particles.forEach(particle => {
          // Update position
          particle.x += particle.vx
          particle.y += particle.vy
          
          // Wrap around edges
          if (particle.x < 0) particle.x = p.width
          if (particle.x > p.width) particle.x = 0
          if (particle.y < 0) particle.y = p.height
          if (particle.y > p.height) particle.y = 0
          
          // Draw particle
          p.fill(255, 255, 255, particle.opacity * 255)
          p.noStroke()
          p.ellipse(particle.x, particle.y, particle.size)
        })
        
        // Draw connections
        particles.forEach((particle, i) => {
          particles.slice(i + 1).forEach(other => {
            const distance = p.dist(particle.x, particle.y, other.x, other.y)
            if (distance < 100) {
              const alpha = p.map(distance, 0, 100, 0.1, 0)
              p.stroke(255, 255, 255, alpha * 255)
              p.strokeWeight(1)
              p.line(particle.x, particle.y, other.x, other.y)
            }
          })
        })
      }

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
      }
    }

    const p5Instance = new p5(sketch, canvasRef.current)

    return () => {
      p5Instance.remove()
    }
  }, [canvasRef])
}