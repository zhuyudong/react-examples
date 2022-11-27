import { UseDeferredValueExample } from './hooks/UseDeferredValueExample'
import { UseIdExample } from './hooks/UseIdExample'
import { UseInsertionEffectExample } from './hooks/UseInsertionEffectExample'
import { UseSyncExternalStoreExample } from './hooks/UseSyncExternalStoreExample'
import { UseTransitionExample } from './hooks/UseTransitionExample'
import './App.css'

function App() {
  return (
    <div className="App space-y-16">
      <UseIdExample />
      <UseDeferredValueExample />
      <UseTransitionExample />
      <UseSyncExternalStoreExample />
      <UseInsertionEffectExample />
    </div>
  )
}

export default App
