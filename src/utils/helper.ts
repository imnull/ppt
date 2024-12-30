export const deepToRaw = (value: unknown, seen: unknown[] = []) => {
  if (value === null || typeof value !== 'object') {
    return value
  }

  if (seen.indexOf(value) > -1) {
    throw new Error('循环引用')
  }
  seen.push(value)
  
  if (Array.isArray(value)) {
    return value.map(item => deepToRaw(item, seen))
  }
  const obj = {}
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      obj[key] = deepToRaw(value[key], seen)
    }
  }
}