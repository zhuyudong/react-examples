import {
  memo,
  Suspense,
  useTransition,
  useEffect,
  useRef,
  useState
} from 'react'

const Meals = memo((props: { query: string }) => {
  const { query } = props
  const [meals, setMeals] = useState([])
  const abortControllerRef = useRef<InstanceType<
    typeof AbortController
  > | null>(null)
  const [isPending, startTransition] = useTransition()

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
    startTransition(() => {
      setMeals(data.meals || [])
    })
  }

  useEffect(() => {
    searchMeals(query)
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [query])

  return (
    <>
      {isPending ? <p>Loading...</p> : null}
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

export function UseTransitionExample(props: any) {
  const [query, setQuery] = useState('')

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">useTransition Example</h2>
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
        <Meals query={query} />
      </Suspense>
    </div>
  )
}
