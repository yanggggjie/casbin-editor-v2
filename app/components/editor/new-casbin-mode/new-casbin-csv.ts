// @ts-nocheck
import { defineMode } from '@codemirror/language'

export const casbinCsvMode = defineMode((config) => {
  function tokenBase(stream, state) {
    const ch = stream.peek()

    if (ch === '#') {
      stream.skipToEnd()
      return 'comment'
    } else if (ch === ',') {
      stream.next()
      return ''
    }

    if (stream.sol() && stream.eat('p')) {
      return 'def'
    }
    if (stream.sol() && (stream.eat('g2') || stream.eat('g'))) {
      return 'keyword'
    }

    if (
      stream.eatWhile((c) => {
        return c !== ','
      })
    ) {
      return 'string'
    }

    stream.skipToEnd()
    return 'property'
  }

  return {
    token: (stream, state) => {
      return tokenBase(stream, state)
    },
  }
})
