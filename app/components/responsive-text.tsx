import React from 'react'

interface ResponsiveTextProps {
  children: React.ReactNode
  className?: string
  baseSize: string
  mdSize: string
  lgSize?: string
}

export function ResponsiveText({ children, className = '', baseSize, mdSize, lgSize }: ResponsiveTextProps) {
  return (
    <span className={`${baseSize} md:${mdSize} ${lgSize ? `lg:${lgSize}` : ''} ${className}`}>
      {children}
    </span>
  )
}

