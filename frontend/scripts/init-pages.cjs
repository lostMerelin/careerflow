const fs = require('fs')
const path = require('path')

const pages = [
  { name: 'Dashboard', title: 'Dashboard' },
  { name: 'Jobs', title: 'Jobs' },
  { name: 'Companies', title: 'Companies' },
  { name: 'Interviews', title: 'Interviews' },
  { name: 'Resume', title: 'Resume' },
  { name: 'CoverLetters', title: 'Cover Letters' },
  { name: 'Tasks', title: 'Tasks' },
  { name: 'Calendar', title: 'Calendar' },
  { name: 'Analytics', title: 'Analytics' },
  { name: 'Notes', title: 'Notes' },
  { name: 'Profile', title: 'Profile' },
  { name: 'Settings', title: 'Settings' },
]

const dir = path.join(__dirname, '..', 'src', 'pages')
fs.mkdirSync(dir, { recursive: true })

pages.forEach(({ name, title }) => {
  const content = `export function ${name}Page() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">${title}</h1>
      <p className="text-muted-foreground mt-1">This section is coming soon.</p>
    </div>
  )
}
`
  fs.writeFileSync(path.join(dir, `${name}Page.tsx`), content)
})

console.log('Готово! Заглушки страниц созданы.')