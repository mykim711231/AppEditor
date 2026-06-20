// SVG 아이콘으로부터 PWA용 PNG 아이콘을 생성한다.
// 실행: npm run icons
import sharp from 'sharp'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const iconDir = join(__dirname, '..', 'public', 'icons')
const svg = readFileSync(join(iconDir, 'icon.svg'))

// 일반 아이콘 (배경 포함)
const targets = [
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
  { size: 180, name: 'apple-touch-icon.png' },
]

// maskable: 안전 영역 확보를 위해 패딩을 둔 배경 위에 합성
async function run() {
  for (const t of targets) {
    await sharp(svg, { density: 384 })
      .resize(t.size, t.size)
      .png()
      .toFile(join(iconDir, t.name))
    console.log('생성:', t.name)
  }

  // maskable 512: 아이콘을 80% 크기로 축소해 배경 패딩 확보
  const inner = Math.round(512 * 0.78)
  const resized = await sharp(svg, { density: 384 }).resize(inner, inner).png().toBuffer()
  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: '#0f172a',
    },
  })
    .composite([{ input: resized, gravity: 'center' }])
    .png()
    .toFile(join(iconDir, 'icon-512-maskable.png'))
  console.log('생성: icon-512-maskable.png')

  // favicon.ico (32x32 PNG 기반)
  await sharp(svg, { density: 384 })
    .resize(32, 32)
    .toFormat('png')
    .toFile(join(__dirname, '..', 'public', 'favicon.ico'))
  console.log('생성: favicon.ico')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
