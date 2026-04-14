import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/article/black-hole-anatomy')
}
```

### 4. `src/app/article/[slug]/page.tsx`
```typescript
import { Metadata } from 'next'
import ArticleContent from '@/components/article/ArticleContent'
import BlackHoleScene from '@/components/three/BlackHoleScene'
import ProtectionOverlay from '@/components/protection/ProtectionOverlay'
import { getArticleData } from '@/lib/content'
import { generateArticleSchema } from '@/lib/seo'

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const article = await getArticleData(params.slug)
  
  return {
    title: `${article.title} | Cosmic Explorer`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.heroImageUrl],
      type: 'article',
      publishedTime: article.date,
      authors: ['Dr. Alan Grant'],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      image: article.heroImageUrl,
    },
  }
}

export default async function ArticlePage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const article = await getArticleData(params.slug)
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify(generateArticleSchema(article))
        }}
      />
      
      <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
        {/* 3D Background Layer */}
        <BlackHoleScene />
        
        {/* Protection Layer */}
        <ProtectionOverlay />
        
        {/* Content Layer */}
        <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
          <ArticleContent article={article} />
        </main>
      </div>
    </>
  )
}
