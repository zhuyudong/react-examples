import { useId } from 'react'

export function UseIdExample() {
  const uid = useId()

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">useId Example</h2>
      <label className="mb-1 block" htmlFor={`${uid}-name`}>
        Name
      </label>
      <input
        className="mb-3 border border-slate-100 px-4 py-3 shadow"
        id={`${uid}-name`}
      />
      <div className="mb-4">
        Generated unique user input id: {`${uid}-name`}
      </div>

      <label className="mb-1 block" htmlFor={`${uid}-age`}>
        Age
      </label>
      <input
        className="mb-3 border border-slate-100 px-4 py-3 shadow"
        id={`${uid}-age`}
      />

      <div>Generated unique age input id: {`${uid}-age`}</div>
    </div>
  )
}
