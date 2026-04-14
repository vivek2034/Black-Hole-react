export interface ArticleData {
  title: string
  excerpt: string
  content: string[]
  heroImageUrl: string
  date: string
  author: string
  readTime: number
}

export async function getArticleData(slug: string): Promise<ArticleData> {
  // In production, this would fetch from CMS or database
  // For demo, returning static data
  
  return {
    title: 'The Anatomy of a Black Hole: Beyond the Event Horizon',
    excerpt: 'A comprehensive exploration of black hole physics, from singularity to Hawking radiation. Discover what happens beyond the point of no return.',
    content: [
      'Black holes represent one of the most extreme predictions of Einstein\'s theory of general relativity. These cosmic entities possess gravitational fields so intense that nothing, not even light, can escape once it crosses the event horizon.',
      'The event horizon marks the boundary of a black hole, a point of no return. For a non-rotating black hole, this boundary is spherical and defined by the Schwarzschild radius: rₛ = 2GM/c², where G is the gravitational constant, M is the mass, and c is the speed of light.',
      'At the center lies the singularity, a point where density becomes infinite and the laws of physics as we know them break down. The singularity is hidden by the event horizon, a concept known as cosmic censorship.',
      'Rotating black holes, described by the Kerr metric, exhibit fascinating properties including frame-dragging and ergospheres. Matter in the accretion disk can reach relativistic speeds, emitting intense X-ray radiation before crossing the horizon.',
      'Quantum mechanics introduces Hawking radiation, a theoretical prediction that black holes slowly evaporate over astronomical timescales. This radiation arises from virtual particle pairs forming near the event horizon.',
      'Recent observations by the Event Horizon Telescope have provided direct images of black hole shadows, confirming theoretical predictions and opening new avenues for testing general relativity in extreme environments.',
      'The information paradox remains one of the greatest unsolved problems in theoretical physics: what happens to information that falls into a black hole? This question challenges our understanding of quantum mechanics and gravity.',
      'Supermassive black holes, residing at galactic centers, play crucial roles in galaxy formation and evolution. Their masses can reach billions of solar masses, influencing star formation rates across entire galaxies.',
      'Gravitational wave astronomy has detected black hole mergers, providing direct evidence for these cosmic phenomena and allowing precise measurements of their properties.',
      'Future research aims to reconcile quantum mechanics with general relativity, potentially through string theory or loop quantum gravity, to fully understand the nature of black holes.'
    ],
    heroImageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=80',
    date: '2024-01-15',
    author: 'Dr. Alan Grant',
    readTime: 12
  }
}
