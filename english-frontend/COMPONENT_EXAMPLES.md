# Component & Design Token Usage Examples

## Example 1: Complete Page Using Design System

```javascript
// src/pages/Example/CoursesPage.jsx
import React from 'react'
import { colors, typography, spacing, borderRadius, shadows } from '@/theme/designTokens'
import PageHeader from '@/components/shared/PageHeader'
import Card from '@/components/shared/Card'
import PrimaryButton from '@/components/shared/PrimaryButton'

export default function CoursesPage() {
  const [courses, setCourses] = React.useState([
    { id: 1, title: 'English Basics', progress: 65 },
    { id: 2, title: 'Advanced Grammar', progress: 40 },
  ])

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `${spacing.xl} ${spacing.lg}`,
  }

  const courseGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: spacing.lg,
    marginTop: spacing.lg,
  }

  const courseCellStyle = {
    backgroundColor: colors.text.light,
    border: `1px solid ${colors.border}`,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    boxShadow: shadows.sm,
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  }

  const progressBarStyle = {
    width: '100%',
    height: '8px',
    backgroundColor: colors.border,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginTop: spacing.md,
  }

  const progressFillStyle = {
    height: '100%',
    background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
    transition: 'width 0.3s ease',
  }

  return (
    <div style={containerStyle}>
      <PageHeader 
        title="My Courses"
        subtitle="Continue learning and track your progress"
        action={<PrimaryButton>New Course</PrimaryButton>}
      />

      <div style={courseGridStyle}>
        {courses.map((course) => (
          <div 
            key={course.id}
            style={courseCellStyle}
            onMouseEnter={(e) => {
              e.currentTarget.boxShadow = shadows.lg
              e.currentTarget.transform = 'translateY(-4px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.boxShadow = shadows.sm
              e.currentTarget.transform = 'translateY(0)'
            }}
          >
            <h3 style={{
              ...typography.sizes.h3,
              color: colors.text.primary,
              marginBottom: spacing.sm,
              fontFamily: typography.fontFamily.base,
            }}>
              {course.title}
            </h3>

            <p style={{
              ...typography.sizes.small,
              color: colors.text.secondary,
              fontFamily: typography.fontFamily.base,
            }}>
              {course.progress}% complete
            </p>

            <div style={progressBarStyle}>
              <div style={{
                ...progressFillStyle,
                width: `${course.progress}%`,
              }} />
            </div>

            <PrimaryButton 
              fullWidth 
              size="md"
              style={{ marginTop: spacing.md }}
            >
              Continue
            </PrimaryButton>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

## Example 2: Using Design Tokens in Styled Components

```javascript
// src/components/CustomComponents/StatCard.jsx
import React from 'react'
import { colors, typography, spacing, borderRadius, shadows } from '@/theme/designTokens'

export default function StatCard({ icon, label, value, trend }) {
  const containerStyle = {
    backgroundColor: colors.text.light,
    border: `2px solid ${colors.primary}`,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    boxShadow: shadows.sm,
    transition: 'all 0.3s ease',
  }

  const iconStyle = {
    fontSize: '32px',
    marginBottom: spacing.md,
  }

  const labelStyle = {
    ...typography.sizes.small,
    color: colors.text.secondary,
    fontFamily: typography.fontFamily.base,
    marginBottom: spacing.sm,
  }

  const valueStyle = {
    ...typography.sizes.h2,
    color: colors.primary,
    fontFamily: typography.fontFamily.base,
    marginBottom: spacing.sm,
  }

  const trendStyle = {
    ...typography.sizes.xs,
    color: trend.isPositive ? colors.success : colors.error,
    fontFamily: typography.fontFamily.base,
  }

  return (
    <div style={containerStyle}>
      <div style={iconStyle}>{icon}</div>
      <div style={labelStyle}>{label}</div>
      <div style={valueStyle}>{value}</div>
      <div style={trendStyle}>
        {trend.isPositive ? '↑' : '↓'} {trend.value}%
      </div>
    </div>
  )
}
```

---

## Example 3: Form with Design Tokens

```javascript
// src/pages/Example/EditProfilePage.jsx
import React from 'react'
import { colors, typography, spacing, borderRadius } from '@/theme/designTokens'
import PageHeader from '@/components/shared/PageHeader'
import PrimaryButton from '@/components/shared/PrimaryButton'

export default function EditProfilePage() {
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    bio: '',
  })

  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: `${spacing.xl} ${spacing.lg}`,
  }

  const formGroupStyle = {
    marginBottom: spacing.lg,
  }

  const labelStyle = {
    display: 'block',
    ...typography.sizes.small,
    color: colors.text.primary,
    fontWeight: 600,
    marginBottom: spacing.sm,
    fontFamily: typography.fontFamily.base,
  }

  const inputStyle = {
    width: '100%',
    padding: `${spacing.sm} ${spacing.md}`,
    border: `1px solid ${colors.border}`,
    borderRadius: borderRadius.md,
    fontSize: typography.sizes.body.fontSize,
    fontFamily: typography.fontFamily.base,
    color: colors.text.primary,
    outline: 'none',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box',
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitting form:', form)
  }

  return (
    <div style={containerStyle}>
      <PageHeader 
        title="Edit Profile"
        subtitle="Update your profile information"
      />

      <form onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            style={inputStyle}
            onFocus={(e) => e.target.borderColor = colors.primary}
            onBlur={(e) => e.target.borderColor = colors.border}
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            style={inputStyle}
            onFocus={(e) => e.target.borderColor = colors.primary}
            onBlur={(e) => e.target.borderColor = colors.border}
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            style={{...inputStyle, minHeight: '120px', resize: 'vertical'}}
            onFocus={(e) => e.target.borderColor = colors.primary}
            onBlur={(e) => e.target.borderColor = colors.border}
          />
        </div>

        <div style={{ display: 'flex', gap: spacing.md }}>
          <PrimaryButton variant="outline">Cancel</PrimaryButton>
          <PrimaryButton type="submit">Save Changes</PrimaryButton>
        </div>
      </form>
    </div>
  )
}
```

---

## Example 4: Cards with Different Variants

```javascript
// Component showcase
import Card from '@/components/shared/Card'
import { colors, spacing, typography } from '@/theme/designTokens'

export default function CardShowcase() {
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: spacing.lg,
    padding: spacing.xl,
  }

  return (
    <div style={containerStyle}>
      {/* Default Card */}
      <Card>
        <h3 style={{ ...typography.sizes.h3, color: colors.text.primary }}>
          Default Card
        </h3>
        <p style={{ ...typography.sizes.body, color: colors.text.secondary }}>
          This is a standard card with subtle shadow
        </p>
      </Card>

      {/* Elevated Card */}
      <Card variant="elevated">
        <h3 style={{ ...typography.sizes.h3, color: colors.text.primary }}>
          Elevated Card
        </h3>
        <p style={{ ...typography.sizes.body, color: colors.text.secondary }}>
          This card has more prominent shadow
        </p>
      </Card>

      {/* Bordered Card */}
      <Card variant="bordered">
        <h3 style={{ ...typography.sizes.h3, color: colors.text.primary }}>
          Bordered Card
        </h3>
        <p style={{ ...typography.sizes.body, color: colors.text.secondary }}>
          This card has a primary color border
        </p>
      </Card>

      {/* Hoverable Card */}
      <Card hover={true}>
        <h3 style={{ ...typography.sizes.h3, color: colors.text.primary }}>
          Hoverable Card
        </h3>
        <p style={{ ...typography.sizes.body, color: colors.text.secondary }}>
          Hover over me to see the effect
        </p>
      </Card>
    </div>
  )
}
```

---

## Example 5: Button Variants Showcase

```javascript
// Button showcase
import PrimaryButton from '@/components/shared/PrimaryButton'
import { spacing } from '@/theme/designTokens'

export default function ButtonShowcase() {
  const containerStyle = {
    padding: spacing.xl,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
  }

  const rowStyle = {
    display: 'flex',
    gap: spacing.md,
    flexWrap: 'wrap',
    alignItems: 'center',
  }

  return (
    <div style={containerStyle}>
      {/* Primary Buttons */}
      <div>
        <h3>Primary Buttons</h3>
        <div style={rowStyle}>
          <PrimaryButton size="sm">Small</PrimaryButton>
          <PrimaryButton size="md">Medium</PrimaryButton>
          <PrimaryButton size="lg">Large</PrimaryButton>
        </div>
      </div>

      {/* Secondary Buttons */}
      <div>
        <h3>Secondary Buttons</h3>
        <div style={rowStyle}>
          <PrimaryButton variant="secondary" size="sm">Small</PrimaryButton>
          <PrimaryButton variant="secondary" size="md">Medium</PrimaryButton>
          <PrimaryButton variant="secondary" size="lg">Large</PrimaryButton>
        </div>
      </div>

      {/* Accent Buttons */}
      <div>
        <h3>Accent Buttons</h3>
        <div style={rowStyle}>
          <PrimaryButton variant="accent" size="sm">Small</PrimaryButton>
          <PrimaryButton variant="accent" size="md">Medium</PrimaryButton>
          <PrimaryButton variant="accent" size="lg">Large</PrimaryButton>
        </div>
      </div>

      {/* Outline Buttons */}
      <div>
        <h3>Outline Buttons</h3>
        <div style={rowStyle}>
          <PrimaryButton variant="outline" size="sm">Small</PrimaryButton>
          <PrimaryButton variant="outline" size="md">Medium</PrimaryButton>
          <PrimaryButton variant="outline" size="lg">Large</PrimaryButton>
        </div>
      </div>

      {/* States */}
      <div>
        <h3>States</h3>
        <div style={rowStyle}>
          <PrimaryButton fullWidth>Full Width</PrimaryButton>
          <PrimaryButton disabled>Disabled</PrimaryButton>
        </div>
      </div>
    </div>
  )
}
```

---

## Example 6: Responsive Layout with Design Tokens

```javascript
// src/pages/Example/DashboardPage.jsx
import React from 'react'
import { colors, typography, spacing } from '@/theme/designTokens'
import PageHeader from '@/components/shared/PageHeader'
import Card from '@/components/shared/Card'

export default function DashboardPage() {
  const mainStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `${spacing.xl} ${spacing.lg}`,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: spacing.lg,
  }

  const statCardStyle = {
    backgroundColor: colors.text.light,
    padding: spacing.lg,
    borderRadius: '8px',
    border: `1px solid ${colors.border}`,
  }

  const stats = [
    { label: 'Total Courses', value: '12', icon: '📚' },
    { label: 'Hours Learned', value: '240', icon: '⏱️' },
    { label: 'Achievements', value: '8', icon: '🏆' },
    { label: 'Current Streak', value: '7 days', icon: '🔥' },
  ]

  return (
    <div>
      <PageHeader 
        title="Your Dashboard"
        subtitle="Track your learning progress"
      />

      <div style={mainStyle}>
        {stats.map((stat, idx) => (
          <div key={idx} style={statCardStyle}>
            <div style={{ fontSize: '32px', marginBottom: spacing.md }}>
              {stat.icon}
            </div>
            <div style={{
              ...typography.sizes.small,
              color: colors.text.secondary,
              marginBottom: spacing.sm,
            }}>
              {stat.label}
            </div>
            <div style={{
              ...typography.sizes.h2,
              color: colors.primary,
            }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

## Key Takeaways

1. **Always import tokens** from `@/theme/designTokens`
2. **Use semantic color names** (colors.primary, colors.text.secondary, etc)
3. **Spread typography objects** for consistency (`...typography.sizes.h1`)
4. **Use spacing tokens** for all margins and padding
5. **Leverage shared components** (Card, PrimaryButton, PageHeader)
6. **Style with objects** instead of Tailwind for component development
7. **Add transitions** for smooth interactions
8. **Test different states** (hover, focus, disabled, active)

---

## Common Patterns

```javascript
// Pattern 1: Container with padding
const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: `${spacing.xl} ${spacing.lg}`,
}

// Pattern 2: Flex gap spacing
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: spacing.lg,
}

// Pattern 3: Text hierarchy
const headingStyle = { ...typography.sizes.h2, color: colors.text.primary }
const bodyStyle = { ...typography.sizes.body, color: colors.text.secondary }

// Pattern 4: Card hover effect
const cardStyle = {
  boxShadow: shadows.sm,
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  ':hover': { boxShadow: shadows.lg }
}
```
