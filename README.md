# Zartashia Saleem — Personal Portfolio

A responsive personal portfolio. Built with plain HTML, CSS, and JavaScript, with no build step or dependencies.

## Preview

Open `index.html`, or run from this directory:

```sh
python3 -m http.server 8001 --bind 127.0.0.1
```

Visit http://127.0.0.1:8001.

## Features

- Blush, rose, and lilac styling with locally drawn project illustrations.
- Gently moving gradients and falling cherry-blossom petals with a pause control.
- Reduced-motion support and light/dark themes, with saved preferences.
- Filters for AI and accessibility projects, and keyboard-accessible project dialogs.
- Expandable experience entries and a mobile navigation menu.
- A portrait photo in the About Me section and the 🜲 portfolio signature.
- Live project links, GitHub, LinkedIn, email copy, and the supplied resume PDF.

All experience, dates, education, achievements, and external destinations come from the supplied resume. Project images are illustrative previews rather than screenshots. The portfolio is a separate site from the MellowTab showcase.

## Editing

- `index.html`: profile content, project cards, resume and social links.
- `style.css`: colors, typography, layout, and motion.
- `script.js`: project details, filtering, themes, animation, and interactions.
- `assets/Zartashia-Saleem-Resume.pdf`: the supplied resume, including its original contact information.

## Hosting

Deploy only this directory’s website files. Any static host can serve them; select Static Site with source directory set to this folder and output directory `.`. No API keys or environment variables are needed. The configured custom domain is https://porfolio.zartashia.com/. It becomes live after DigitalOcean deployment and GoDaddy DNS verification.

## Verification

Checked in a separate Chrome session: desktop and mobile layout, project filtering, modal open/close and keyboard focus restoration, mobile navigation, light/dark preference controls, reduced-motion behavior, and email copying. Automated accessibility scans found no violations in the checked light and dark states, with contrast on some decorative elements requiring manual review. This is not a full accessibility certification.

## DigitalOcean deployment

The [App Platform configuration](.do/app.yaml) uses `tashi128/Portfolio`, branch `main`, and deploys a Static Site. Its build copies only the website assets into `_static`. No database, API keys, or environment variables are needed.

In your DigitalOcean account, create an app from this repository and use the configuration in `.do/app.yaml`. Check the selected account, Static Site resource type, and displayed price. The source directory is `/`; the output directory is `_static`; the build command is:

```sh
mkdir -p _static && cp index.html style.css script.js _static/ && cp -R assets _static/assets
```

## Connect porfolio.zartashia.com

The hostname intentionally uses **porfolio**, matching the requested address.

1. After deploying, open the app’s Networking → Domains section. If the domain was not imported from the app spec, add `porfolio.zartashia.com`.
2. Choose **You manage your domain** and copy the exact CNAME target shown by DigitalOcean.
3. In GoDaddy DNS for `zartashia.com`, add a **CNAME** with name **porfolio**, value equal to that target hostname, and the default TTL. Do not include `https://` or a path.
4. Finish adding the domain and wait for verification and HTTPS.

Keep all other DNS records and nameservers unchanged, including the existing MellowTab subdomain.

[DigitalOcean domain instructions](https://docs.digitalocean.com/products/app-platform/how-to/manage-domains/)
