import { javascript } from '@codemirror/lang-javascript'
import { monokai } from '@uiw/codemirror-theme-monokai'
import { mathematica } from '@codemirror/legacy-modes/mode/mathematica'
import { highlightActiveLine } from '@codemirror/view'
import { LanguageSupport, matchBrackets } from '@codemirror/language'
import { placeholder } from '@codemirror/view'
import { casbinConfMode } from '@/app/components/editor/new-casbin-mode/new-casbin-conf'
import { casbinCsvMode } from '@/app/components/editor/new-casbin-mode/new-casbin-csv'
import CodeMirror from '@uiw/react-codemirror'
import { StreamLanguage } from '@codemirror/language'
import { go } from '@codemirror/legacy-modes/mode/go'
import './editor.css'

import React, { CSSProperties } from 'react'
import { basicSetup } from 'codemirror'
import {
  casbinCSV,
  casbinCSVLexer,
} from '@/app/components/editor/casbin-language/CasbinCSV'
import { casbinCSVmode } from '@/app/components/editor/casbin-mode/casbin-csv'

interface EditorProps {
  text: string
  onChange?: (text: string) => void
  style?: CSSProperties
}

export const CustomFunctionEditor = (props: EditorProps) => {
  return (
    <div style={{ height: '100%', ...props.style }}>
      <CodeMirror
        onChange={(value) => {
          props.onChange(value)
        }}
        theme={monokai}
        extensions={[StreamLanguage.define(go)]}
        // todo
        // options={props.options}
        options={{
          lineNumbers: true,
          indentUnit: 4,
          styleActiveLine: true,
          matchBrackets: true,
          mode: 'javascript',
          lineWrapping: true,
          theme: 'monokai',
        }}
        className={'function'}
        value={props.text}
      />
    </div>
  )
}

export const ModelEditor = (props: EditorProps) => {
  return (
    <div style={{ height: '100%', ...props.style }}>
      <CodeMirror
        theme={monokai}
        onChange={(value) => {
          props.onChange(value)
        }}
        // todo
        // options={props.options}
        options={{
          lineNumbers: true,
          indentUnit: 4,
          styleActiveLine: true,
          matchBrackets: true,
          mode: 'casbin-conf',
          lineWrapping: true,
          theme: 'monokai',
        }}
        extensions={[basicSetup]}
        className={'function'}
        value={props.text}
      />
    </div>
  )
}

export const PolicyEditor = (props: EditorProps) => {
  return (
    <div style={{ height: '100%', ...props.style }}>
      <CodeMirror
        extensions={[new LanguageSupport(casbinCSV())]}
        theme={monokai}
        onChange={(value) => {
          props.onChange(value)
        }}
        // todo
        // options={props.options}
        options={{
          lineNumbers: true,
          indentUnit: 4,
          styleActiveLine: true,
          matchBrackets: true,
          mode: 'casbin-csv',
          lineWrapping: true,
          theme: 'monokai',
        }}
        className={'function'}
        value={props.text}
      />
    </div>
  )
}

export const RequestEditor = (props: EditorProps) => {
  return (
    <div style={{ height: '100%', ...props.style }}>
      <CodeMirror
        theme={monokai}
        onChange={(value) => {
          props.onChange(value)
        }}
        // todo
        // options={props.options}
        options={{
          lineNumbers: true,
          indentUnit: 4,
          styleActiveLine: true,
          matchBrackets: true,
          mode: 'mathematica',
          lineWrapping: true,
          theme: 'monokai',
        }}
        className={'function'}
        value={props.text}
      />
    </div>
  )
}

interface RequestResultEditorProps {
  value: string
  style?: CSSProperties
}

export const RequestResultEditor = (props: RequestResultEditorProps) => {
  return (
    <div style={props.style}>
      <CodeMirror
        onChange={() => {
          return
        }}
        value={props.value}
        options={{
          readOnly: true,
          indentUnit: 4,
          styleActiveLine: true,
          matchBrackets: true,
          mode: 'javascript',
          lineWrapping: true,
          theme: 'monokai',
        }}
      />
    </div>
  )
}
