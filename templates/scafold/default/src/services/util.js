function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) {
    return 'N/A'
  }
  let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: '2-digit',
    year: '2-digit',
  })
}

function formatTime(date) {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  })
}

function getRandomNumberBetween(min = 0, max = 10) {
  return Math.floor(Math.random() * max) + min
}

function nullToNa(value) {
  return null === value || undefined === value ? 'NA' : value
}

function truncate(str, max = 30) {
  return str.length > max ? str.slice(0, max).padEnd(max + 3, '.') : str
}

function uuid() {
  return new Date().getTime().toString(36) + performance.now().toString().replace(/[^0-9]/g, '')
}

export {
  bytesToSize,
  formatDate,
  formatTime,
  getRandomNumberBetween,
  nullToNa,
  truncate,
  uuid
}
