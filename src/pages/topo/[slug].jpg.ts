// Topo images people can save to their phone gallery, one per wall.
import type { APIRoute } from 'astro'
import { readFile } from 'node:fs/promises'
import satori from 'satori'
import sharp from 'sharp'
import { band, slug, walls } from '../../walls'

const muted = '#5d665e', line = '#d3d8cf', red = '#e5322d'
const grades = { easy: '#2f8a4c', mid: '#2c6bb3', hard: '#d97a10', max: '#8e1c3a' }

// Satori can't read woff2, fontsource ships plain woff too. latin-ext is for č, š, ž.
const fonts = await Promise.all(([['big-shoulders-display', 'Display', 800], ['public-sans', 'Sans', 400], ['public-sans', 'Sans', 600]] as const)
  .flatMap(([pkg, name, weight]) => ['latin', 'latin-ext'].map(async sub =>
    ({ name: sub === 'latin' ? name : `${name} ext`, weight, data: await readFile(`node_modules/@fontsource/${pkg}/files/${pkg}-${sub}-${weight}-normal.woff`) }))))

const display = 'Display, Display ext'

// Neither font has ★, so draw it
const star = { type: 'img', props: { width: 22, height: 22, src: `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="${red}" d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 21.2l1.6-7L2 9.5l7.1-.6z"/></svg>`)}` } }

const h = (style: object, ...children: unknown[]) =>
  ({ type: 'div', props: { style: { display: 'flex', ...style }, children: children.filter(Boolean) } })

const grade = (g: string) => {
  const b = band(g)
  return h({ minWidth: 70, padding: '4px 10px', borderRadius: 4, justifyContent: 'center', fontWeight: 600,
    ...(b === 'none' ? { border: `1px dashed ${muted}`, color: muted } : { background: grades[b], color: '#fff' }) }, g)
}

const wall = async (w: typeof walls[number]) => {
  const { data, info } = await sharp(`src/photos/${slug(w.name)}.jpg`).rotate().resize(560).jpeg({ quality: 80 }).toBuffer({ resolveWithObject: true })
  return h({ gap: 40, padding: '32px 0', borderTop: `2px solid ${line}` },
    { type: 'img', props: { src: `data:image/jpeg;base64,${data.toString('base64')}`, width: info.width, height: info.height, style: { borderRadius: 6 } } },
    h({ flexDirection: 'column', flex: 1 },
      h({ fontFamily: display, fontSize: 56, marginBottom: 12 }, w.name.toUpperCase()),
      ...w.problems.map(p => h({ gap: 16, padding: '12px 0', borderTop: `1px solid ${line}`, alignItems: 'flex-start' },
        h({ width: 40, height: 40, flexShrink: 0, borderRadius: 20, border: p.num ? `3px solid ${red}` : 'none',
          justifyContent: 'center', alignItems: 'center', color: red, fontFamily: display, fontSize: 22 }, p.num === '★' ? star : p.num),
        h({ flexDirection: 'column', flex: 1 },
          h(p.name ? { fontWeight: 600 } : { color: muted }, p.name ?? 'brez imena'),
          p.note && h({ color: muted, fontSize: 18 }, p.note)),
        p.grade && grade(p.grade)))))
}

export const getStaticPaths = () => walls.map(w => ({ params: { slug: slug(w.name) } }))

export const GET: APIRoute = async ({ params }) => {
  const page = h({ flexDirection: 'column', padding: 48, background: '#eef0ea', color: '#1f2420', fontFamily: 'Sans, Sans ext', fontSize: 20 },
    h({ justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: 24 },
      h({ fontFamily: display, fontSize: 64 }, 'NENATANČEN VODNIČEK ZALOGA'),
      h({ color: muted }, 'zalog.alters.si')),
    await wall(walls.find(w => slug(w.name) === params.slug)!))

  const svg = await satori(page as any, { width: 1400, fonts })
  const jpg = await sharp(Buffer.from(svg)).jpeg({ quality: 80 }).toBuffer()
  return new Response(new Uint8Array(jpg), { headers: { 'Content-Type': 'image/jpeg' } })
}
