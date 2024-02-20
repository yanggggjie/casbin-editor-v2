'use client'
import CodeMirror from '@uiw/react-codemirror'
import React from 'react'
import { firestore } from './lang'

function App() {
  const onChange = React.useCallback((value, viewUpdate) => {
    console.log('value:', value)
  }, [])
  return (
    <CodeMirror
      value={`db.collection("Items").where("name", "==", "temp").limit(1).get();
`}
      height="100vh"
      extensions={[firestore()]}
      onChange={onChange}
    />
  )
}

export default App
