import { z } from 'zod'

// CRM API Schema based on the actual CRM endpoint
export const CRMLeadSchema = z.object({
  name: z.string().min(1, 'שם חובה'),
  phone: z.string().min(1, 'טלפון חובה').transform(val => val.replace(/[-\s]/g, '')).refine(
    val => /^[0-9]{9,10}$/.test(val),
    'מספר טלפון חייב להיות 9-10 ספרות'
  ),
  email: z.string().email('אימייל לא תקין').optional().nullable(),
  company: z.string().optional(),
  projectType: z.string().optional(),
  estimatedBudget: z.number().optional(),
  notes: z.string().optional(),
  source: z.enum(['WEBSITE', 'PHONE', 'WHATSAPP', 'REFERRAL', 'OTHER']).default('WEBSITE')
})

export type CRMLead = z.infer<typeof CRMLeadSchema>

// Contact Page Form Schema
export const ContactPageFormSchema = z.object({
  name: z.string().min(1, 'שם חובה'),
  email: z.string().email('אימייל לא תקין').optional(),
  phone: z.string().min(1, 'טלפון חובה'),
  company: z.string().optional(),
  service: z.string().min(1, 'בחר שירות'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(1, 'הודעה חובה')
})

export type ContactPageForm = z.infer<typeof ContactPageFormSchema>

// Homepage Contact Section Form Schema
export const HomepageContactFormSchema = z.object({
  name: z.string().min(1, 'שם חובה'),
  email: z.string().email('אימייל לא תקין').optional(),
  phone: z.string().min(1, 'טלפון חובה'),
  subject: z.string().min(1, 'בחר נושא'),
  message: z.string().min(1, 'הודעה חובה')
})

export type HomepageContactForm = z.infer<typeof HomepageContactFormSchema>

// API Response types
export interface CRMResponse {
  success: boolean
  message?: string
  data?: any
  error?: string
}

/**
 * Submit lead to CRM system via API route
 * This now goes through our server-side API for security
 */
export async function submitLead(lead: CRMLead): Promise<CRMResponse> {
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lead)
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'שגיאה בשליחת הטופס'
      }
    }

    return data
  } catch (error) {
    return {
      success: false,
      error: 'שגיאת רשת. אנא בדוק את החיבור שלך ונסה שוב'
    }
  }
}

/**
 * Convert budget string to number
 */
function convertBudgetToNumber(budget: string): number | undefined {
  if (!budget || budget.trim() === '') return undefined

  // Extract numbers from budget strings like "₪5,000 - ₪15,000" or "עד ₪5,000"
  const match = budget.match(/(\d{1,3}(?:,\d{3})*)/g)
  if (match && match.length > 0) {
    // Take the first number (minimum) from range
    const firstNumber = match[0].replace(/,/g, '')
    return parseInt(firstNumber, 10)
  }
  return undefined
}

/**
 * Convert Contact Page form data to CRM lead format
 */
export function mapContactPageToCRM(formData: ContactPageForm): CRMLead {
  const lead: any = {
    name: formData.name,
    phone: formData.phone, // Required field
    notes: [
      formData.timeline && `לוח זמנים: ${formData.timeline}`,
      `הודעה: ${formData.message}`
    ].filter(Boolean).join('\n\n'),
    source: 'WEBSITE'
  }

  // Optional fields - only include if they have values
  if (formData.email && formData.email.trim() !== '') {
    lead.email = formData.email.trim()
  }
  if (formData.company && formData.company.trim() !== '') {
    lead.company = formData.company.trim()
  }
  if (formData.service && formData.service.trim() !== '') {
    lead.projectType = formData.service.trim()
  }
  if (formData.budget && formData.budget.trim() !== '') {
    const budgetNumber = convertBudgetToNumber(formData.budget)
    if (budgetNumber) {
      lead.estimatedBudget = budgetNumber
    }
  }

  return lead
}

/**
 * Convert Homepage Contact form data to CRM lead format
 */
export function mapHomepageContactToCRM(formData: HomepageContactForm): CRMLead {
  const lead: any = {
    name: formData.name,
    phone: formData.phone, // Required field
    notes: formData.message,
    source: 'WEBSITE'
  }

  // Optional fields - only include if they have values
  if (formData.email && formData.email.trim() !== '') {
    lead.email = formData.email.trim()
  }
  if (formData.subject && formData.subject.trim() !== '') {
    lead.projectType = formData.subject.trim()
  }

  return lead
}

/**
 * Submit Contact Page form
 */
export async function submitContactPageForm(formData: ContactPageForm): Promise<CRMResponse> {
  try {
    // Validate form data
    const validatedData = ContactPageFormSchema.parse(formData)

    // Convert to CRM format
    const crmLead = mapContactPageToCRM(validatedData)

    // Validate CRM data
    const validatedCRMLead = CRMLeadSchema.parse(crmLead)

    // Submit to CRM
    return await submitLead(validatedCRMLead)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0]
      return {
        success: false,
        error: firstError.message
      }
    }
    return {
      success: false,
      error: 'שגיאה בעיבוד הטופס'
    }
  }
}

/**
 * Submit Homepage Contact form
 */
export async function submitHomepageContactForm(formData: HomepageContactForm): Promise<CRMResponse> {
  try {
    // Validate form data
    const validatedData = HomepageContactFormSchema.parse(formData)

    // Convert to CRM format
    const crmLead = mapHomepageContactToCRM(validatedData)

    // Validate CRM data
    const validatedCRMLead = CRMLeadSchema.parse(crmLead)

    // Submit to CRM
    return await submitLead(validatedCRMLead)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0]
      return {
        success: false,
        error: firstError.message
      }
    }
    return {
      success: false,
      error: 'שגיאה בעיבוד הטופס'
    }
  }
}