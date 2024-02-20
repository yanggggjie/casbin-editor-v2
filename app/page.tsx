'use client'
import Image from 'next/image'
import { EditorScreen } from '@/app/components/editor'
import 'normalize.css/normalize.css'
import { Footer } from '@/app/components/ui'
import clsx from 'clsx'
export default function Home() {
  return (
    <main>
      <EditorScreen />
      <Footer>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/casbin/casbin-editor"
        >
          <img
            alt="GitHub stars"
            src="https://img.shields.io/github/stars/casbin/casbin-editor?style=social"
          />
        </a>
        <span style={{ color: '#FFFFFF', float: 'right', fontSize: 14 }}>
          Copyright © {new Date().getFullYear()} Casbin contributors.
        </span>
      </Footer>
    </main>
  )
}
