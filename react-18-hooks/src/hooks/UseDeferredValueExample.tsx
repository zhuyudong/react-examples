import {
  memo,
  Suspense,
  useDeferredValue,
  useEffect,
  useRef,
  useState
} from 'react'

const Meals = memo((props: { query: string }) => {
  const { query } = props
  const abortControllerRef = useRef<InstanceType<
    typeof AbortController
  > | null>(null)
  const [meals, setMeals] = useState([])

  const searchMeals = async (query: string) => {
    abortControllerRef.current?.abort()
    abortControllerRef.current = new AbortController()

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
      {
        signal: abortControllerRef.current.signal
      }
    )
    const data = await response.json()
    setMeals(data.meals || [])
  }

  useEffect(() => {
    searchMeals(query)

    return () => {
      abortControllerRef.current?.abort()
    }
  }, [query])

  return (
    <>
      {Array.isArray(meals) ? (
        <ul className="mt-3 max-h-[30rem] space-y-2 overflow-auto">
          {meals.map(meal => {
            const { idMeal, strMeal } = meal
            return <li key={idMeal}>{strMeal}</li>
          })}
        </ul>
      ) : null}
    </>
  )
})

Meals.displayName = 'Meals'

export function UseDeferredValueExample(props: any) {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">useDeferredValue Example</h2>
      <div>
        <div>
          <label htmlFor="mealQuery" className="mb-1 block">
            Meal
          </label>
        </div>
        <input
          id="mealQuery"
          className="border border-slate-100 px-4 py-2 shadow"
          value={query}
          onChange={e => {
            setQuery(e.target.value)
          }}
        />
      </div>
      <Suspense fallback="Loading results...">
        <Meals query={deferredQuery} />
      </Suspense>
    </div>
  )
}
