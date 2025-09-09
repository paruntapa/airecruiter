"use client"

import { useState } from 'react'

const VapiDebug = () => {
  const [showDebug, setShowDebug] = useState(false)

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  const vapiKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY
  const nodeEnv = process.env.NODE_ENV

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button 
        onClick={() => setShowDebug(!showDebug)}
        className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
      >
        VAPI Debug
      </button>
      
      {showDebug && (
        <div className="mt-2 bg-black text-white p-4 rounded-lg text-xs max-w-xs">
          <h3 className="font-bold mb-2">VAPI Debug Info</h3>
          <div className="space-y-1">
            <div>Node Env: {nodeEnv}</div>
            <div>VAPI Key: {vapiKey ? `${vapiKey.substring(0, 8)}...` : 'NOT SET'}</div>
            <div>Key Length: {vapiKey ? vapiKey.length : 0}</div>
            <div>Window: {typeof window !== 'undefined' ? 'Available' : 'Not Available'}</div>
            <div>Location: {typeof window !== 'undefined' ? window.location.origin : 'N/A'}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VapiDebug
