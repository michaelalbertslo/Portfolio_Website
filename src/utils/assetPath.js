export function assetPath(relativePath = '') {
  const base = import.meta.env.BASE_URL || '/'
  const normalized = relativePath.startsWith('/')
    ? relativePath.slice(1)
    : relativePath
  const safeBase = base.endsWith('/') ? base : `${base}/`
  return `${safeBase}${normalized}`
}

export function normalizeContentTreePaths(node) {
  if (!node || typeof node !== 'object') return node

  if (typeof node.src === 'string') node.src = assetPath(node.src)
  if (typeof node.imagePath === 'string') node.imagePath = assetPath(node.imagePath)
  if (Array.isArray(node.images)) {
    node.images = node.images.map((img) =>
      typeof img === 'string' ? assetPath(img) : img
    )
  }

  if (node.children && typeof node.children === 'object') {
    Object.values(node.children).forEach((child) => normalizeContentTreePaths(child))
  }

  return node
}
