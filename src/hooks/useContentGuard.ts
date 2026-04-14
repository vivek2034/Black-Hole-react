'use client'

import { useEffect } from 'react'

export const useContentGuard = () => {
  useEffect(() => {
    // Disable right-click on protected content
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('.protected-content') || target.closest('.no-select')) {
        e.preventDefault()
        
        // Show custom message
        const message = document.createElement('div')
        message.className = 'fixed top-4 right-4 bg-red-900/90 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse'
        message.textContent = 'Content protection active'
        document.body.appendChild(message)
        
        setTimeout(() => {
          document.body.removeChild(message)
        }, 2000)
      }
    }
    
    // Disable drag and drop
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('.protected-content') || target.tagName === 'IMG') {
        e.preventDefault()
        return false
      }
    }
    
    // Disable copy/paste on protected content
    const handleCopy = (e: ClipboardEvent) => {
      const selection = window.getSelection()
      if (selection && selection.toString().length > 0) {
        const target = e.target as HTMLElement
        if (target.closest('.protected-content')) {
          e.preventDefault()
          
          // Replace clipboard with custom message
          e.clipboardData?.setData('text/plain', 
            'Content copying is disabled. Please visit Cosmic Explorer for authorized content access.'
          )
        }
      }
    }
    
    // Add blur effect when trying to inspect
    const handleBlur = () => {
      if (document.hidden) {
        document.body.style.filter = 'blur(10px)'
        document.body.style.transition = 'filter 0.3s'
        
        setTimeout(() => {
          document.body.style.filter = ''
        }, 1000)
      }
    }
    
    // Add event listeners
    window.addEventListener('contextmenu', handleContextMenu)
    window.addEventListener('dragstart', handleDragStart)
    document.addEventListener('copy', handleCopy)
    document.addEventListener('visibilitychange', handleBlur)
    
    // Add CSS protection
    const style = document.createElement('style')
    style.textContent = `
      .protected-content img {
        pointer-events: none;
        -webkit-user-drag: none;
        user-drag: none;
      }
      
      .protected-content {
        position: relative;
      }
      
      .protected-content::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(45deg, transparent 49%, rgba(255,255,255,0.02) 50%, transparent 51%);
        background-size: 10px 10px;
        pointer-events: none;
        opacity: 0.1;
      }
    `
    document.head.appendChild(style)
    
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu)
      window.removeEventListener('dragstart', handleDragStart)
      document.removeEventListener('copy', handleCopy)
      document.removeEventListener('visibilitychange', handleBlur)
      document.head.removeChild(style)
    }
  }, [])
}
