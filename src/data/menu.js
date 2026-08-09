/**
 * Full menu lives here so the Menu page and any teaser on Home read from
 * the same data instead of hand-copied items.
 */
export const MENU = [
  {
    category: 'Starters',
    items: [
      { name: 'Charred Octopus', description: 'Smoked paprika, lemon oil', price: '$18' },
      { name: 'Burrata', description: 'Heirloom tomato, basil', price: '$14' },
      { name: 'Soup of the Day', description: 'Ask your server', price: '$11' },
    ],
  },
  {
    category: 'Mains',
    items: [
      { name: 'Braised Short Rib', description: 'Root vegetables, jus', price: '$32' },
      { name: 'Wild Mushroom Risotto', description: 'Parmesan, truffle oil', price: '$24' },
      { name: 'Pan-Seared Halibut', description: 'Beurre blanc, seasonal greens', price: '$34' },
    ],
  },
  {
    category: 'Desserts',
    items: [
      { name: 'Basque Cheesecake', description: 'Salted caramel', price: '$12' },
      { name: 'Dark Chocolate Torte', description: 'Espresso cream', price: '$13' },
    ],
  },
  {
    category: 'Drinks',
    items: [
      { name: 'House Red / White', description: "Ask for tonight's selection", price: '$14' },
      { name: 'Old Fashioned', description: 'Bourbon, bitters, orange', price: '$16' },
    ],
  },
]

/**
 * Subset of the menu for a Home page teaser. itemsPerCategory optionally
 * caps items per category if you just want a taste, not the whole thing.
 */
export function menuTeaser(categoryCount = 2, itemsPerCategory) {
  const categories = MENU.slice(0, categoryCount)
  if (!itemsPerCategory) return categories
  return categories.map((c) => ({ ...c, items: c.items.slice(0, itemsPerCategory) }))
}
