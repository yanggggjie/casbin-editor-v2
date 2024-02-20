import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { StreamLanguage } from '@codemirror/stream-parser'
import { basicSetup } from 'codemirror'
import { LanguageSupport } from '@codemirror/language'

export function casbinCSV() {
  return StreamLanguage.define({
    startState() {
      return {}
    },
    token(stream, state) {
      const ch = stream.peek()

      if (ch === '#') {
        stream.skipToEnd()
        return 'comment'
      } else if (ch === ',') {
        stream.next()
        return null // No specific styling for commas
      }

      if (stream.sol() && stream.match('p')) {
        return 'keyword' // Using 'keyword' for 'p' at the start of a line
      }
      if (stream.sol() && (stream.match('g2') || stream.match('g'))) {
        return 'keyword' // 'g' and 'g2' also styled as keywords
      }

      if (stream.skipTo(',')) {
        return 'string' // Treat everything else as strings until a comma
      }

      stream.skipToEnd()
      return 'string' // Default to string styling
    },
  })
}
