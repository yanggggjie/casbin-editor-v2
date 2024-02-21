import { monokai } from '@uiw/codemirror-theme-monokai'
import { EditorView } from '@codemirror/view'
import { indentUnit } from '@codemirror/language'
import CodeMirror from '@uiw/react-codemirror'
import { StreamLanguage } from '@codemirror/language'
import { go } from '@codemirror/legacy-modes/mode/go'
import { javascriptLanguage } from '@codemirror/lang-javascript'
import './editor.css'

import React, { CSSProperties } from 'react'
import { basicSetup } from 'codemirror'
import { CasbinConfSupport } from '@/app/components/editor/casbin-mode/casbin-conf'
import { CasbinPolicySupport } from '@/app/components/editor/casbin-mode/casbin-csv'

interface EditorProps {
  text: string
  onChange: (text: string) => void
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
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          bracketMatching: true,
          indentOnInput: true,
        }}
        extensions={[
          basicSetup,
          StreamLanguage.define(go),
          indentUnit.of('    '),
          EditorView.lineWrapping,
        ]}
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
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          bracketMatching: true,
          indentOnInput: true,
        }}
        extensions={[
          basicSetup,
          CasbinConfSupport(),
          indentUnit.of('    '),
          EditorView.lineWrapping,
        ]}
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
        extensions={[
          basicSetup,
          CasbinPolicySupport(),
          indentUnit.of('    '),
          EditorView.lineWrapping,
        ]}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          bracketMatching: true,
          indentOnInput: true,
        }}
        theme={monokai}
        onChange={(value) => {
          props.onChange(value)
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
        extensions={[
          basicSetup,
          CasbinPolicySupport(),
          indentUnit.of('    '),
          EditorView.lineWrapping,
        ]}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          bracketMatching: true,
          indentOnInput: true,
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
        theme={monokai}
        extensions={[
          basicSetup,
          javascriptLanguage,
          indentUnit.of('    '),
          EditorView.lineWrapping,
        ]}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          bracketMatching: true,
          indentOnInput: true,
        }}
        value={props.value}
      />
    </div>
  )
}
