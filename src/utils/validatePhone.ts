export function validatePhone(phone: string): boolean {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '')
  
  // Israeli mobile phone: starts with 05 and has 10 digits
  const israeliMobile = /^05\d{8}$/
  
  // Israeli landline: starts with 0[2-4,8-9] and has 9 digits
  const israeliLandline = /^0[2-4,8-9]\d{7}$/
  
  // International format with +972
  const international = /^972(5\d{8}|[2-4,8-9]\d{7})$/
  
  return (
    israeliMobile.test(cleaned) ||
    israeliLandline.test(cleaned) ||
    international.test(cleaned)
  )
}