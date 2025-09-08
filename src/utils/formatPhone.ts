export function formatPhone(phone: string): string {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '')
  
  // Israeli phone format: 05X-XXX-XXXX
  if (cleaned.length === 10 && cleaned.startsWith('05')) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  
  // International format with country code
  if (cleaned.length === 12 && cleaned.startsWith('972')) {
    const localNumber = '0' + cleaned.slice(3)
    return formatPhone(localNumber)
  }
  
  return phone
}