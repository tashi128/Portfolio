# 🜲 Zartashia Saleem — Developer Portfolio

A personal portfolio showcasing my work in artificial intelligence, web accessibility, and software development. Built with HTML, CSS, and vanilla JavaScript, the website combines an interactive project showcase with my professional experience, education, and achievements.

**[View Portfolio](https://portfolio-ej9hp.ondigitalocean.app/)** · **[LinkedIn](https://www.linkedin.com/in/zartashia-s-66b723349/)** · **[GitHub](https://github.com/tashi128)**

## About

I am a BSc Computer Science (Hons) student at Technological University Dublin, with an interest in building practical AI applications and accessible user experiences. My work spans browser extensions, document-based learning tools, autonomous agents, and AI adoption in professional settings.

This portfolio brings those experiences together in a responsive website with a distinctive visual identity, clear project narratives, and direct links to working demonstrations.

## Features

- **Interactive project showcase:** Filter projects by AI and accessibility, explore implementation details in modal dialogs, and open live demonstrations.
- **Professional profile:** Education, work experience, leadership roles, and hackathon recognition presented in dedicated sections.
- **Animated background:** Falling cherry-blossom petals rendered with HTML Canvas, supported by soft animated gradients.
- **Light and dark themes:** Switch between visual themes, with preferences retained locally.
- **Motion controls:** Pause or resume the background animation, with support for the system’s reduced-motion preference.
- **Responsive layout:** Desktop and mobile layouts, including a collapsible navigation menu.
- **Contact and résumé:** Email copying, social profile links, and a downloadable résumé.

## Featured Projects

| Project | Overview | Link |
| --- | --- | --- |
| **MellowTab** | A team-built Chrome extension combining AI text simplification, read-aloud support, image descriptions, and experimental flashing-video detection. Developed at the Google AI Student Hackathon. | [Project showcase](https://mellowtab.zartashia.com/) |
| **AI Study Buddy** | An AI-powered study platform that turns uploaded PDF, DOCX, and TXT documents into flashcards, summaries, questions, and document-grounded learning workflows. | [Live demo](https://studybuddy.zartashia.com/) |
| **Minecraft Autonomous Agent** | A Mineflayer and DeepSeek agent with a planner covering 1,200+ recipes, multi-step task decomposition, and movement validation. Developed at the Daytona × Giveago Hackathon. | [Video demo](https://www.youtube.com/watch?v=pzJn4Lnonj8) |
| **Photosensitivity Accessibility Extension** | A team-built browser-extension prototype exploring frame-level video analysis and flashing mitigation. Awarded Best User Experience and Best Presentation at the Workday Hackathon. | [Live demo](https://puddin.pasbola.com/) |

Project illustrations in the portfolio are designed previews. The linked projects are separate applications; their AI and video-processing functionality does not run inside this portfolio.

## Technology

| Layer | Implementation |
| --- | --- |
| Structure | Semantic HTML5 |
| Styling | CSS Grid, Flexbox, custom properties, media queries, and animations |
| Interactivity | Vanilla JavaScript and native browser APIs |
| Background rendering | Canvas 2D and `requestAnimationFrame` |
| Preferences | `localStorage` with graceful fallback |
| Project dialogs | Native HTML `<dialog>` |
| Hosting | DigitalOcean App Platform — Static Site |
| Domain management | GoDaddy DNS |

The website requires no JavaScript framework, package installation, database, or API credentials.

## Getting Started

### Clone the repository

```sh
git clone https://github.com/tashi128/Portfolio.git
cd Portfolio
```

### Run locally

Open `index.html` directly, or serve the project with Python 3:

```sh
python3 -m http.server 8001 --bind 127.0.0.1
```

Visit **http://127.0.0.1:8001**. A local server is recommended for testing browser features such as clipboard access.

## Repository Structure

```text
Portfolio/
├── index.html                         # Page structure, content, and metadata
├── style.css                          # Layout, themes, and responsive styling
├── script.js                          # Interactions and background animation
├── assets/
│   ├── favicon.svg                    # Portfolio symbol
│   ├── zartashia-portrait.jpeg         # About section portrait
│   └── Zartashia-Saleem-Resume.pdf     # Downloadable résumé
├── .do/
│   └── app.yaml                       # DigitalOcean App Platform specification
├── .gitignore
└── README.md
```

## Accessibility and Motion

The implementation includes a skip-to-content link, semantic navigation, visible focus indicators, accessible control names, and status announcements for project filtering and email copying.

Project dialogs support keyboard dismissal and return focus to the triggering button. Background animation respects `prefers-reduced-motion`, can be paused manually, and stops rendering when the browser tab is hidden.

Browser checks covered desktop and mobile layouts, project filtering, dialog behavior, navigation, theme switching, reduced-motion handling, and email copying. Automated accessibility scans reported no violations in the light and dark states checked during development. Some decorative contrast combinations still require manual assessment; these checks do not constitute a complete accessibility audit.

## Deployment

The repository includes a [DigitalOcean App Platform specification](.do/app.yaml) for deployment from the `main` branch.

| Setting | Value |
| --- | --- |
| App name | `zartashia-portfolio` |
| Component | `portfolio` |
| Resource type | Static Site |
| Source directory | `/` |
| Output directory | `_static` |
| Index document | `index.html` |
| Route | `/` |
| Automatic deployment | Enabled on push in the app specification |

The packaging command copies the public website files into the deployment directory:

```sh
mkdir -p _static && cp index.html style.css script.js _static/ && cp -R assets _static/assets
```

To deploy, create an app in DigitalOcean App Platform, connect this repository, and apply the included specification. Review the resource configuration and account pricing before deployment.

### Custom domain

The configured custom domain is **`porfolio.zartashia.com`**. The spelling matches the hostname in the app specification and website metadata.

To connect it, add the hostname under the app’s **Networking → Domains** settings and select **You manage your domain**. In GoDaddy, create a CNAME record named `porfolio` using the exact target provided by DigitalOcean. Complete domain and HTTPS verification in App Platform.

See [DigitalOcean’s domain documentation](https://docs.digitalocean.com/products/app-platform/how-to/manage-domains/) for setup details.

## Content Updates

- Update profile information, project cards, and external links in `index.html`.
- Update project dialog content in the `projects` object in `script.js`.
- Adjust colors, typography, and layout in `style.css`.
- Replace the portrait or résumé in `assets/`, preserving filenames or updating their HTML references.
- Keep project cards and dialog descriptions consistent when adding or editing projects.

## Author

**Zartashia Saleem**

Computer Science Student · Technological University Dublin · Dublin, Ireland

[LinkedIn](https://www.linkedin.com/in/zartashia-s-66b723349/) · [GitHub](https://github.com/tashi128) · [Email](mailto:saleemzartashia1@gmail.com)
