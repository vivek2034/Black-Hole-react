'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useContentGuard } from '@/hooks/useContentGuard'

interface ArticleData {
  title: string
  excerpt: string
  content: string[]
  heroImageUrl: string
  date: string
  author: string
  readTime: number
}

interface ArticleContentProps {
  article: ArticleData
}

export default function ArticleContent({ article }: ArticleContentProps) {
  useContentGuard()
  
  const [scrollProgress, setScrollProgress] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-gradient-to-r from-purple-600 to-pink-600">
        <motion.div 
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
          style={{ width: `${scrollProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Article Header */}
        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="text-sm text-gray-400">Astrophysics</span>
            <span className="text-gray-600">•</span>
            <span className="text-sm text-gray-400">{article.readTime} min read</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
          >
            {article.title}
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                <span className="text-white font-bold">AG</span>
              </div>
              <div>
                <p className="font-semibold">{article.author}</p>
                <p className="text-sm text-gray-400">{article.date}</p>
              </div>
            </div>
          </motion.div>
        </header>
        
        {/* Hero Image with Protection */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="relative mb-12 rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/30 protected-content"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
          <div className="absolute inset-0 z-20 cursor-pointer" />
          
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
            <Image
              src={article.heroImageUrl}
              alt="Black Hole Event Horizon Visualization"
              fill
              className="object-cover no-select"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              priority
            />
          </div>
          
          <div className="absolute bottom-6 left-6 z-30">
            <span className="inline-block px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-sm text-gray-300 border border-gray-700">
              Simulation: NASA/ESA Black Hole Visualization
            </span>
          </div>
        </motion.div>
        
        {/* Article Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          {article.content.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="mb-6 text-gray-300 leading-relaxed"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
        
        {/* Scientific Data Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 p-6 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl border border-gray-800 backdrop-blur-sm"
        >
          <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            Key Scientific Data
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Schwarzschild Radius', value: '2.95 km/M☉', desc: 'Event Horizon Size' },
              { label: 'Hawking Temperature', value: '6.17×10⁻⁸ K/M☉', desc: 'Quantum Evaporation' },
              { label: 'Surface Gravity', value: '1.52×10¹³ m/s²', desc: 'At Event Horizon' },
              { label: 'Tidal Forces', value: '~10¹⁶ g/cm³', desc: 'Spaghettification Limit' },
            ].map((item, index) => (
              <div key={index} className="p-4 bg-black/30 rounded-xl border border-gray-800">
                <p className="text-sm text-gray-400">{item.label}</p>
                <p className="text-xl font-bold text-white mt-2">{item.value}</p>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Interactive Visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
            Interactive Gravitational Effects
          </h3>
          
          <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-r from-gray-900 to-black border border-gray-800">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-dashed border-emerald-500/30 animate-spin-slow">
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-emerald-900/20 to-transparent" />
                </div>
                <p className="text-gray-400">Gravitational Time Dilation Simulation</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.article>
    </>
  )
}
