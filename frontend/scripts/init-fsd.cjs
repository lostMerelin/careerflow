const fs = require('fs')
const path = require('path')

const dirs = [
  'src/app/providers',
  'src/app/store',
  'src/app/styles',
  'src/app/routes',
  'src/pages',
  'src/widgets',
  'src/features',
  'src/entities',
  'src/shared/ui',
  'src/shared/api',
  'src/shared/lib',
  'src/shared/hooks',
  'src/shared/config',
  'src/shared/types',
  'src/shared/assets',
]

dirs.forEach((dir) => {
  const fullPath = path.join(__dirname, '..', dir)
  fs.mkdirSync(fullPath, { recursive: true })
  fs.writeFileSync(path.join(fullPath, '.gitkeep'), '')
})