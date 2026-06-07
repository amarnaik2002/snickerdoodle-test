import { useState, useEffect } from 'react'

export default function useCountUp(target, go) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!go) return
    let raf, start = null
    const dur = 2000
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / dur, 1)
      setN(Math.round(p * target))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [go, target])
  return n
}
