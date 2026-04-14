import { ArticleData } from './content'

export function generateArticleSchema(article: ArticleData) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.heroImageUrl,
    "datePublished": article.date,
    "dateModified": article.date,
    "author": {
      "@type": "Person",
      "name": article.author,
      "jobTitle": "Senior Astrophysicist"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Cosmic Explorer",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cosmicexplorer.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://cosmicexplorer.com/article/${article.title.toLowerCase().replace(/ /g, '-')}`
    },
    "articleSection": "Astrophysics",
    "keywords": "black holes, astrophysics, general relativity, event horizon, singularity, Hawking radiation",
    "wordCount": article.content.join(' ').split(' ').length,
    "timeRequired": `PT${article.readTime}M`,
    "inLanguage": "en-US"
  }
}

export function generateMetaTags(article: ArticleData) {
  return {
    title: `${article.title} | Cosmic Explorer`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [
        {
          url: article.heroImageUrl,
          width: 1200,
          height: 630,
          alt: 'Black Hole Visualization'
        }
      ],
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
      siteName: 'Cosmic Explorer'
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.heroImageUrl],
      creator: '@CosmicExplorer',
      site: '@CosmicExplorer'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }
  }
}
