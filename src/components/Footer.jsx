export default function Footer({
  logo = 'Brand',
  address = '123 Main St, Your City',
  phone = '(555) 123-4567',
  hours = 'Mon–Sun: 11am – 10pm',
  social = [],
}) {
  return (
    <footer className="bg-brand-bg border-t border-brand-border">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <p className="font-heading text-2xl text-brand-primary mb-3">{logo}</p>
          <p className="font-body text-sm text-brand-muted">{address}</p>
        </div>
        <div className="font-body text-sm text-brand-muted space-y-1">
          <p>{phone}</p>
          <p>{hours}</p>
        </div>
        <div className="flex gap-4 font-body text-sm text-brand-muted md:justify-end items-start">
          {social.map((s) => (
            <a key={s.label} href={s.href} className="hover:text-brand-primary transition-colors">
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <div className="text-center text-xs text-brand-muted pb-6 font-body">
        © {new Date().getFullYear()} {logo}. All rights reserved.
      </div>
    </footer>
  )
}
