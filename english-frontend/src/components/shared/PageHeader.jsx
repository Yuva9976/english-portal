import React from 'react'
import { colors, spacing, typography } from '../theme/designTokens'

export default function PageHeader({ 
  title, 
  subtitle = '',
  action = null,
  className = '',
  ...props 
}) {
  return (
    <div 
      style={{
        marginBottom: spacing.xl,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: spacing.lg,
      }}
      className={className}
      {...props}
    >
      <div>
        <h1 
          style={{
            ...typography.sizes.h1,
            color: colors.text.primary,
            marginBottom: subtitle ? spacing.sm : 0,
            fontFamily: typography.fontFamily.base,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p 
            style={{
              ...typography.sizes.body,
              color: colors.text.secondary,
              fontFamily: typography.fontFamily.base,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
