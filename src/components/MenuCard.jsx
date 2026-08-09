/**
 * items: [{ name, description, price }]
 * Used for menu / drink list sections across all 3 industries.
 */
export default function MenuCard({ category = 'Starters', items = [] }) {
  return (
    <div className="bg-brand-surface rounded-2xl p-8 border border-brand-border">
      <h3 className="font-heading text-2xl text-brand-primary mb-6">{category}</h3>
      <ul className="space-y-5">
        {items.map((item) => (
          <li key={item.name} className="flex justify-between gap-4">
            <div>
              <p className="font-body font-medium text-brand-text">{item.name}</p>
              {item.description && (
                <p className="font-body text-sm text-brand-muted mt-1">{item.description}</p>
              )}
            </div>
            <span className="font-body font-medium text-brand-accent whitespace-nowrap">
              {item.price}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
