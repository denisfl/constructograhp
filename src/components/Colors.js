const colors = [
  '#f44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFEB3B',
  '#FFC107',
  '#FF9800',
  '#FF5722',
  '#795548',
  '#9E9E9E',
  '#607D8B'
]

export default {
  get(length, opacity) {
    let result = []

    if (Number.isInteger(length) && length > 0)
      result = colors.slice(0, length)

    if (Number.isInteger(opacity))
      result = this.hexToRGBA(result, opacity)

    return result
  },
  hexToRGBA(array, opacity) {
    let result = []

    if (Array.isArray(array) && Number.isInteger(opacity)) {
      array.forEach(function(element) {
        let hex = element.replace('#', '')
        let r = parseInt(hex.substring(0, 2), 16)
        let g = parseInt(hex.substring(2, 4), 16)
        let b = parseInt(hex.substring(4, 6), 16)

        result.push('rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')')
      })

      return result
    }

  }
}
