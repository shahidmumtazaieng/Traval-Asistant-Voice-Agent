import { useEffect } from 'react'

export const useStatsCounter = (ref) => {
  useEffect(() => {
    if (!ref.current) return

    const counters = ref.current.querySelectorAll('.stats-counter')
    
    const observerOptions = {
      threshold: 0.5
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target
          const target = parseInt(counter.getAttribute('data-target'))
          animateCounter(counter, target)
          observer.unobserve(counter)
        }
      })
    }, observerOptions)

    counters.forEach(counter => {
      observer.observe(counter)
    })

    return () => {
      counters.forEach(counter => {
        observer.unobserve(counter)
      })
    }
  }, [ref])
}

const animateCounter = (element, target) => {
  let current = 0
  const increment = target / 100
  const duration = 2000
  const stepTime = duration / 100

  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(timer)
    }
    element.textContent = Math.floor(current).toLocaleString()
  }, stepTime)
}