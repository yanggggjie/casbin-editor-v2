'use client'
import React, { isValidElement, useEffect, useState } from 'react'
import SelectModel from './select-model'
import Syntax from './syntax'
import RunTest from './run-test'
import { ModelKind } from './casbin-mode/example'
import { Settings } from './settings'
import Share, { ShareFormat } from './share'
import Copy from './copy'
import {
  defaultEnforceContextData,
  SetupEnforceContext,
} from './setup-enforce-context'
import { ModelEditor } from '@/app/components/editor/editors/ModalEditor'
import { PolicyEditor } from '@/app/components/editor/editors/PolicyEditor'
import { RequestEditor } from '@/app/components/editor/editors/RequestEditor'
import { RequestResultEditor } from '@/app/components/editor/editors/RequestResultEditor'

export const EditorScreen = () => {
  const [modelKind, setModelKind] = useState<ModelKind>()
  const [modelText, setModelText] = useState('')
  const [policy, setPolicy] = useState('')
  const [request, setRequest] = useState('')
  const [echo, setEcho] = useState<JSX.Element>(<></>)
  const [requestResult, setRequestResult] = useState('')
  const [customConfig, setCustomConfig] = useState('')
  const [share, setShare] = useState('')
  const [enforceContextData, setEnforceContextData] = useState(
    new Map(defaultEnforceContextData),
  )

  function setPolicyPersistent(text: string): void {
    setPolicy(text)
  }

  function setModelTextPersistent(text: string): void {
    setModelText(text)
  }

  function setCustomConfigPersistent(text: string): void {
    setCustomConfig(text)
  }

  function setRequestPersistent(text: string): void {
    setRequest(text)
  }

  function setEnforceContextDataPersistent(map: Map<string, string>): void {
    const text = JSON.stringify(Object.fromEntries(map))
    setEnforceContextData(new Map(map))
  }

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash) {
      setEcho(<div>Loading Shared Content...</div>)
      fetch(`https://dpaste.com/${hash}.txt`)
        .then((resp) => {
          return resp.text()
        })
        .then((content) => {
          const sharedContent = JSON.parse(content) as ShareFormat
          setPolicyPersistent(sharedContent.policy)
          setModelTextPersistent(sharedContent.model)
          setCustomConfigPersistent(sharedContent.customConfig)
          setRequestPersistent(sharedContent.request)
          setRequestPersistent(sharedContent.request)
          if (sharedContent.enforceContext) {
            setEnforceContextDataPersistent(
              new Map(Object.entries(sharedContent.enforceContext)),
            )
          }
          setRequestResult('')
          window.location.hash = '' // prevent duplicate load
          setEcho(<div>Shared Content Loaded.</div>)
        })
        .catch(() => {
          setEcho(<div>Failed to load Shared Content.</div>)
        })
    }
  }, [])

  // useEffect(() => {
  //   setPolicy()
  //   setModelText()
  //   setRequest()
  //   setCustomConfig(get(Persist.CUSTOM_FUNCTION, modelKind))
  //   setEnforceContextData(
  //     new Map(
  //       Object.entries(JSON.parse(get(Persist.ENFORCE_CONTEXT, modelKind)!)),
  //     ),
  //   )
  // }, [modelKind])

  function handleShare(v: JSX.Element | string) {
    if (isValidElement(v)) {
      setEcho(v)
    } else {
      const currentPath = window.location.origin + window.location.pathname
      setShare(v as string)
      setEcho(<div>{`Shared at ${currentPath}#${v}`}</div>)
    }
  }

  return (
    <div>
      <Settings
        text={customConfig}
        onCustomConfigChange={(v) => {
          setCustomConfigPersistent(v)
        }}
      />
      <div style={{ flex: 1 }}>
        <div>
          <div>
            <div>
              <div>Model</div>
              <SelectModel
                onChange={(value) => {
                  setModelKind(value as ModelKind)
                }}
              />
              <button
                onClick={() => {
                  const ok = window.confirm('Confirm Reset?')
                  if (ok) {
                    window.location.reload()
                  }
                }}
                style={{ marginLeft: 8 }}
              >
                Reset
              </button>
            </div>
            <ModelEditor text={modelText} onChange={setModelTextPersistent} />
          </div>
          <div>
            <div>Policy</div>
            <PolicyEditor text={policy} onChange={setPolicyPersistent} />
          </div>
        </div>

        <div>
          <div>
            <div>
              <div>Request</div>
              <SetupEnforceContext
                data={enforceContextData}
                onChange={setEnforceContextDataPersistent}
              />
            </div>
            <RequestEditor text={request} onChange={setRequestPersistent} />
          </div>
          <div>
            <div>Enforcement Result</div>
            <RequestResultEditor value={requestResult} />
          </div>
        </div>

        <div style={{ padding: 8 }}>
          <Syntax
            model={modelText}
            onResponse={(component) => {
              return setEcho(component)
            }}
          />
          <RunTest
            modelKind={modelKind}
            model={modelText}
            policy={policy}
            customConfig={customConfig}
            request={request}
            enforceContextData={enforceContextData}
            onResponse={(v) => {
              if (isValidElement(v)) {
                setEcho(v)
              } else if (Array.isArray(v)) {
                setRequestResult(v.join('\n'))
              }
            }}
          />
          {!share ? (
            <Share
              onResponse={(v) => {
                return handleShare(v)
              }}
              model={modelText}
              policy={policy}
              customConfig={customConfig}
              request={request}
              enforceContext={Object.entries(enforceContextData)}
            />
          ) : (
            <Copy
              content={share}
              cb={() => {
                setShare('')
                setEcho(<div>Copied.</div>)
              }}
            />
          )}
          <div style={{ display: 'inline-block' }}>{echo}</div>
        </div>
      </div>
    </div>
  )
}
