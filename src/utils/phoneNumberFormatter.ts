export const formatPhoneNumber = (value: string): string => {
  if (!value) return value

  let phoneNumber = value.replace(/\D/g, '')
  const phoneNumberLength = phoneNumber.length

  phoneNumber = phoneNumber.replace(/^992(?=992)/, '')

  if (phoneNumberLength === 0) return ''

  if (!phoneNumber.startsWith('992')) {
    return `992${phoneNumber}`
  }
  if (phoneNumberLength <= 3) {
    return ``
  } else if (phoneNumberLength <= 6) {
    return `(+${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
  } else if (phoneNumberLength <= 8) {
    return `(+${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6)}`
  } else if (phoneNumberLength <= 10) {
    return `(+${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 8)}-${phoneNumber.slice(8, 10)}`
  } else {
    return `(+${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 8)}-${phoneNumber.slice(
      8,
      10
    )}-${phoneNumber.slice(10, 12)}`
  }
}

export const phoneNumberToNumber = (value: any) => {
  const numericString = value.replace(/\D/g, '')

  return numericString
}
