import { useEffect, useRef, useState } from 'react'

// 한글/IME 조합 안전 입력.
// - 로컬 미러(local)로 DOM 값을 유지해 조합 중 React가 값을 되돌리지 않도록 한다.
// - 조합 중에는 상위 onChange(store 커밋)를 호출하지 않고, 조합 종료 시 커밋.
export default function TextInput({ value, onChange, ...rest }) {
  const composing = useRef(false)
  const [local, setLocal] = useState(value ?? '')

  // 외부 value 변경은 조합 중이 아닐 때만 반영
  useEffect(() => {
    if (!composing.current) setLocal(value ?? '')
  }, [value])

  return (
    <input
      {...rest}
      value={local}
      onChange={(e) => {
        const v = e.target.value
        setLocal(v)
        if (!composing.current) onChange(v)
      }}
      onCompositionStart={() => {
        composing.current = true
      }}
      onCompositionEnd={(e) => {
        composing.current = false
        const v = e.target.value
        setLocal(v)
        onChange(v)
      }}
    />
  )
}
