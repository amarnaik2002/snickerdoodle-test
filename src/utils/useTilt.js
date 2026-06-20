import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export function useTilt(max = 10) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.willChange = 'transform'
    const onMove = e => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width  - 0.5
      const y = (e.clientY - rect.top)  / rect.height - 0.5
      gsap.to(el, {
        rotateY: x * max * 2, rotateX: y * -max * 2,
        scale: 1.03, transformPerspective: 700,
        duration: 0.45, ease: 'power2.out',
      })
    }
    const onLeave = () => gsap.to(el, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.65, ease: 'power3.out' })
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [max])
  return ref
}
