import React from 'react'
import { colors, spacing, borderRadius, shadows } from '../theme/designTokens'

export default function Card({ 
  children, 
  variant = 'default',
  hover = false,
  className = '',
  ...props 
}) {
  const baseStyles = {
    backgroundColor: colors.text.light,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    border: `1px solid ${colors.border}`,
    transition: 'all 0.3s ease',
    boxShadow: shadows.sm,
  }

  const variantStyles = {
    default: {},
    elevated: {
      boxShadow: shadows.lg,
    },
    bordered: {
      border: `2px solid ${colors.primary}`,
    },
  }

  const hoverStyles = hover ? {
    cursor: 'pointer',
    ':hover': {
      boxShadow: shadows.lg,
      transform: 'translateY(-4px)',
    },
  } : {}

  const finalStyle = {
    ...baseStyles,
    ...variantStyles[variant],
    ...hoverStyles,
  }

  return (
    <div style={finalStyle} className={className} {...props}>
      {children}
    </div>
  )
}
