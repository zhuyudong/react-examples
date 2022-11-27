import { useEffect } from 'react'
import { createStore } from './createStore'

// @ts-ignore
const useCountStore = createStore(set => {
  return {
    count: 0,
    decrement: () => {
      // @ts-ignore
      set(state => {
        state.count -= 1
      })
    },
    increment: () => {
      // @ts-ignore
      set(state => {
        state.count += 1
      })
    },
    divide: () => {
      // @ts-ignore
      set(state => {
        state.count /= 2
      })
    },
    multiply: () => {
      // @ts-ignore
      set(state => {
        state.count *= 2
      })
    }
  }
})

export function UseSyncExternalStoreExample(props: any) {
  // @ts-ignore
  const countStore = useCountStore()
  // @ts-ignore
  const multipliedCount = useCountStore(store => store.count * 2)
  // @ts-ignore
  const multiply = useCountStore(store => store.multiply)
  // @ts-ignore
  useEffect(() => {
    // @ts-ignore
    const unsubscribe = useCountStore.subscribe((state, prevState) => {
      console.log('State changed')
      console.log('Prev state', prevState)
      console.log('New state', state)
    })

    return unsubscribe
  }, [])

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">useSyncExternalStore Example</h2>
      {/* @ts-ignore */}
      <div>Count: {countStore.count}</div>
      {/* @ts-ignore */}
      <div>Multiplied Count: {multipliedCount}</div>
      <div className="mt-4 flex gap-4">
        <button
          className="bg-sky-700 px-4 py-3 text-sky-100"
          // @ts-ignore
          onClick={countStore.decrement}
        >
          Decrement
        </button>
        <button
          className="bg-sky-700 px-4 py-3 text-sky-100"
          // @ts-ignore
          onClick={countStore.increment}
        >
          Increment
        </button>
        <button
          className="bg-sky-700 px-4 py-3 text-sky-100"
          // @ts-ignore
          onClick={countStore.divide}
        >
          Divide
        </button>
        <button
          className="bg-sky-700 px-4 py-3 text-sky-100"
          // @ts-ignore
          onClick={multiply}
        >
          Multiply
        </button>
      </div>
    </div>
  )
}
