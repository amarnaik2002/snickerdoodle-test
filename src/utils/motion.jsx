import { motion } from 'framer-motion'

export const Btn = ({ children, hover, tap, style, className, onClick, type }) => {
  const M = motion.button
  return (
    <M
      whileHover={hover}
      whileTap={tap}
      style={style}
      className={className}
      onClick={onClick}
      type={type}
    >
      {children}
    </M>
  )
}

export const MA = ({ children, hover, style, className, href, ...rest }) => {
  const M = motion.a
  return (
    <M href={href} whileHover={hover} style={style} className={className} {...rest}>
      {children}
    </M>
  )
}
