import React from 'react'
import { colors, spacing, borderRadius, typography } from '../theme/designTokens'

export default function PrimaryButton({ 
  children, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  className = '',
  ...props 
}) {
  const baseStyles = {
    fontFamily: typography.fontFamily.base,
    fontWeight: 600,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    borderRadius: borderRadius.lg,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
  }

  const sizeStyles = {
    sm: {
      padding: `${spacing.sm} ${spacing.md}`,
      fontSize: '14px',
    },
    md: {
      padding: `${spacing.md} ${spacing.lg}`,
      fontSize: '16px',
    },
    lg: {
      padding: `${spacing.lg} ${spacing.xl}`,
      fontSize: '16px',
    },
  }

  const variantStyles = {
    primary: {
      backgroundColor: colors.primary,
      color: colors.text.light,
      ':hover': { backgroundColor: '#0a8a99' },
    },
    secondary: {
      backgroundColor: colors.secondary,
      color: colors.text.primary,
      ':hover': { backgroundColor: '#ffb833' },
    },
    accent: {
      backgroundColor: colors.accent,
      color: colors.text.light,
      ':hover': { backgroundColor: '#e54960' },
    },
    outline: {
      backgroundColor: 'transparent',
      color: colors.primary,
      border: `2px solid ${colors.primary}`,
      ':hover': { backgroundColor: colors.background },
    },
  }

  const finalStyle = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
  }

  return (
    <button
      style={finalStyle}
      disabled={disabled}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </button>
  )
}
