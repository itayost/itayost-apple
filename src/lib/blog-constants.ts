// Blog constants that can be imported in both server and client components

// Categories match the actual values used in blog post frontmatter
export const blogCategories = [
  { id: 'all', label: 'הכל' },
  { id: 'פיתוח אתרים', label: 'פיתוח אתרים' },
  { id: 'טכנולוגיה', label: 'טכנולוגיה' },
  { id: 'מדריכים', label: 'מדריכים' },
  { id: 'אבטחת אתרים', label: 'אבטחת אתרים' },
  { id: 'עיצוב אתרים', label: 'עיצוב אתרים' },
  { id: 'מסחר אלקטרוני', label: 'מסחר אלקטרוני' },
  { id: 'SEO ושיווק', label: 'SEO ושיווק' },
] as const

export type BlogCategory = typeof blogCategories[number]
