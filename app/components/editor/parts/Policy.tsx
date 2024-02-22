import { clsx } from 'clsx'
import { PolicyEditor } from '@/app/components/editor/editors/PolicyEditor'
import React from 'react'
interface Props {
  policy: string
  setPolicyPersistent: (value: string) => void
}

export default function Policy({ policy, setPolicyPersistent }: Props) {
  return (
    <div>
      <div>Policy</div>
      <PolicyEditor text={policy} onChange={setPolicyPersistent} />
    </div>
  )
}
