import type { CSSProperties } from 'react'
import { useState } from 'react'
import { useStyles } from './UseStyles'

const styles = (props: Record<string, CSSProperties>) => {
  return {
    buttonsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    button: {
      backgroundColor: '#9333ea',
      color: '#faf5ff',
      fontSize: '18px',
      padding: '8px 12px',
      width: `${props.width}px`
    }
  }
}

export function UseInsertionEffectExample(props: any) {
  const [width, setWidth] = useState(150)
  const style = useStyles(styles, { width })
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">useInsertionEffect Example</h2>

      <div>
        <div className={style.buttonsContainer}>
          <button
            className={style.button}
            onClick={() => setWidth(width => width - 5)}
          >
            Decrement
          </button>
          <button
            className={style.button}
            onClick={() => setWidth(width => width + 5)}
          >
            Increment
          </button>
        </div>
      </div>
    </div>
  )
}
