# Pure Water Solutions

Website for Pure Water Solutions – RO repair and water purifier service in Wakad, Pimpri-Chinchwad, Pune.

Built with React (Next.js App Router) and Tailwind CSS. There is no backend or database: every enquiry opens WhatsApp with a prefilled message.

## Where things live

- `lib/site.ts` – business details, WhatsApp link helper, services and the product catalogue (brands, products, order).
- `lib/image-data.ts` – dimensions and blur placeholders for the optimised images in `public/images`.
- `components/` – one component per section (header, hero, about, services, products, contact, footer).
- `app/robots.ts`, `app/sitemap.ts` – served at `/robots.txt` and `/sitemap.xml`.

## Deploying on Vercel

1. Import the repository in Vercel (or press **Publish** in v0). No environment variables or extra configuration are needed.
2. Vercel detects Next.js and builds with `next build`.

## Connecting a custom domain

1. In Vercel open the project, then **Settings → Domains → Add Domain** and enter your domain (for example `purewatersol.in`).
2. At your domain registrar add the DNS records Vercel shows: an `A` record for the root domain and a `CNAME` record for `www`.
3. Wait for DNS to propagate. Vercel issues the HTTPS certificate automatically.
4. If the domain differs from `https://purewatersol.in`, update `site.url` in `lib/site.ts` so the canonical URL, sitemap and structured data match.

The footer links to `https://purewatersol.in/privacy-policy.html`. If this site replaces the one currently on that domain, add the policy as `public/privacy-policy.html` so the link keeps working.
