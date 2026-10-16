import { defineConfig } from 'astro/config'
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'

// Tell sw.js about every built file, so one visit saves the whole guide for offline use
const offline = {
  name: 'offline',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const files = readdirSync(dir, { recursive: true })
        .filter(f => statSync(new URL(f, dir)).isFile() && !/sw\.js$|\.woff$/.test(f))
        .map(f => '/' + f.replace(/index\.html$/, ''))
      const sw = new URL('sw.js', dir)
      writeFileSync(sw, readFileSync(sw, 'utf8')
        .replace("'dev'", `'${Date.now()}'`)
        .replace('[]', JSON.stringify(files)))
    },
  },
}

export default defineConfig({ integrations: [offline] })
