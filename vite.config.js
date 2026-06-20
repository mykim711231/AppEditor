import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages 프로젝트 사이트는 /<repo>/ 하위 경로로 서빙된다.
// 사용자 정의 도메인/루트 배포 시에는 BASE=/ 로 환경변수를 넘기면 된다.
const base = process.env.BASE ?? '/AppEditor/'

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon.svg', 'icons/apple-touch-icon.png', 'favicon.ico'],
      manifest: {
        name: '모바일 코드 에디터',
        short_name: 'CodeEditor',
        description: '아이폰·갤럭시 태블릿용 코드 에디터 + 멀티 AI 문의 PWA',
        lang: 'ko',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'any',
        start_url: base,
        scope: base,
        id: base,
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        navigateFallback: base + 'index.html',
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === self.location.origin,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'app-shell' },
          },
          {
            // Google Fonts 스타일시트
            urlPattern: ({ url }) => url.origin === 'https://fonts.googleapis.com',
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-stylesheets' },
          },
          {
            // Google Fonts 폰트 파일 (오프라인 시 폰트 누락으로 인한 레이아웃 깨짐 방지)
            urlPattern: ({ url }) => url.origin === 'https://fonts.gstatic.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // AI 사이트 파비콘(로고) — 구글 파비콘 서비스, 오프라인 캐시
            urlPattern: ({ url }) => url.href.startsWith('https://www.google.com/s2/favicons'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'ai-favicons',
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 90 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  build: {
    target: 'es2018',
    chunkSizeWarningLimit: 1500,
  },
})
