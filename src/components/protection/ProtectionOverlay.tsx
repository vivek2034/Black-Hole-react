'use client'

import { useEffect } from 'react'

export default function ProtectionOverlay() {
  useEffect(() => {
    // Prevent keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && e.key === 'u')
      ) {
        e.preventDefault()
        return false
      }
      
      // Disable Ctrl+S, Ctrl+P
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'p')) {
        e.preventDefault()
        return false
      }
    }
    
    // Prevent text selection on protected elements
    const handleSelection = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.closest('.protected-content') || target.closest('.no-select')) {
        e.preventDefault()
      }
    }
    
    // Add event listeners
    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('selectstart', handleSelection)
    document.addEventListener('contextmenu', (e) => {
      if ((e.target as HTMLElement).closest('.protected-content')) {
        e.preventDefault()
      }
    })
    
    // Detect DevTools opening (basic detection)
    const devToolsCheck = () => {
      const threshold = 160
      const widthThreshold = window.outerWidth - window.innerWidth > threshold
      const heightThreshold = window.outerHeight - window.innerHeight > threshold
      
      if (widthThreshold || heightThreshold) {
        document.body.innerHTML = `
          <div class="fixed inset-0 bg-black flex items-center justify-center z-50">
            <div class="text-center p-8">
              <h2 class="text-2xl font-bold text-red-500 mb-4">Security Alert</h2>
              <p class="text-gray-300">Developer tools are not permitted on this page.</p>
              <p class="text-gray-400 text-sm mt-2">Please refresh the page to continue reading.</p>
            </div>
          </div>
        `
      }
    }
    
    // Check periodically
    const interval = setInterval(devToolsCheck, 1000)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('selectstart', handleSelection)
      clearInterval(interval)
    }
  }, [])
  
  return (
    <>
      {/* Transparent overlay for images */}
      <div className="fixed inset-0 pointer-events-none z-40" />
      
      {/* Watermark */}
      <div className="fixed bottom-4 right-4 text-xs text-gray-700/30 pointer-events-none z-40">
        © Cosmic Explorer • Protected Content • {new Date().getFullYear()}
      </div>
    </>
  )
}
