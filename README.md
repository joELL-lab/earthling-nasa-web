# Stellaris NASA — Interactive Space Exploration Portal

[![License: MIT](https://img.shields.io/badge/License-MIT-3B82F6.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-Semantic-080A0F?logo=html5&logoColor=60A5FA)](#project-structure)
[![CSS3](https://img.shields.io/badge/CSS3-Modular%20Tokens-080A0F?logo=css3&logoColor=60A5FA)](#design-system)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla%20ES6-080A0F?logo=javascript&logoColor=F59E0B)](#project-structure)

An interactive, richly animated **NASA Web Portal** built on a dark cosmic design system with zero build dependencies. It combines a high-contrast orbital dashboard, live client-side search, interactive mission briefings, GPU-accelerated animations, and verified public-domain NASA photography.

---

## Pages & Features

1. **Home (`index.html`) — Mission Dashboard**
   - **Orbital Hero:** Full-bleed twinkling starfield canvas with mouse parallax, blur-to-sharp entrance typography (`"Welcome home, Earthling"`), live pill search bar with instant dropdown results, curved Earth horizon parallax, and a sonar-pulsing **"Watch live — International Space Station"** modal player.
   - **Asymmetric 4-Column Bento Grid:** Interactive feature stories (*Asteroid Bennu/Vesta*, *New Jet Engine Tech*, *ESA Space Station Commitment*, *Modern Figures*, *TIMED*, *Cassini*, *Curiosity Rover*, and *Space Exploration Trailer* video modal), chronological **NASA events** sidebar with `Calendar` / `Launches` schedule modal, and an expandable **MORE STORIES** drawer.
   - **Social & Image of the Day (30% / 70% Split):** Scrollable `@NASA` feed with interactive likes alongside **Image of the Day** (*"Space Station Flight Over the Southern Tip of Italy"*) featuring a frosted floating detail card.
   - **Missions Carousel (`Our missions`):** Spotlight-hover horizontal slider for **Hubble**, **Juno**, **New Horizons**, **Cassini**, **James Webb**, and **Artemis** with modal mission briefs.

2. **Features (`features.html`) — Space Technologies & Capabilities**
   - **NASA By The Numbers:** Scroll-triggered count-up telemetry strip with animated progress bars.
   - **Interactive Tech Grid:** Animated category tabs (`All`, `Propulsion`, `Robotics`, `Observatories`, `Earth Science`, `Human Spaceflight`) filtering dark bento cards covering SLS & Ion Drives, Perseverance & Ingenuity, JWST optics, Earth Climate Satellites, ISS Microgravity Labs, and X-59 Quiet Supersonic Flight.

3. **Projects (`projects.html`) — Missions & Exploration Directory**
   - **Live Filtering & Search:** Filter missions by status and domain (`All`, `Active`, `Upcoming`, `Historic`, `Lunar`, `Mars`, `Deep Space`) paired with live keyword search.
   - **3D Tilt Mission Cards:** Interactive cards with live green telemetry pulse badges and a **Mission Brief Modal** detailing launch dates, targets, scientific objectives, instruments, and milestones.

4. **About Us (`about-us.html`) — Vision, History & Field Centers**
   - **Vision, Mission & Core Values:** `Safety`, `Integrity`, `Teamwork`, `Excellence`, and `Inclusion`.
   - **Scroll-Animated Vertical Timeline:** Progressive glowing orbital track from `1958` (Founded), `1969` (Apollo 11), `1981` (Space Shuttle), `1990` (Hubble), `1998` (ISS), and `2021` (JWST) to the `Artemis Era`.
   - **Field Centers & Pioneers:** Spotlight cards for Kennedy Space Center, Johnson Space Center, Jet Propulsion Laboratory, Goddard Space Flight Center, and *Modern Figures* pioneers.

5. **Contact Us (`contact-us.html`) — Mission Control & Public Inquiries**
   - **Validated Inquiry Form:** 2-column glassmorphism layout with real-time validation, animated submission state, and slide-in confirmation toast, alongside NASA Headquarters contact details (`300 E Street SW, Washington, D.C. 20546`).
   - **FAQ Accordion:** Smooth height/chevron transitions covering center tours, astronaut applications, public-domain media usage, and live ISS tracking.

---

## Motion & Design System

### Core Design Tokens (`assets/css/nasa-tokens.css`)
| Token | Value | Purpose |
| :--- | :--- | :--- |
| `--bg-space` | `#080A0F` | Deep space canvas background |
| `--bg-card` | `#141822` | Elevated bento & mission card surface |
| `--accent-blue` | `#3B82F6` | Primary orbital action & CTA accent |
| `--glow-cyan` | `#60A5FA` | Telemetry highlights, borders & active indicators |
| `--launch-amber` | `#F59E0B` | Rocket exhaust ember particles & upcoming status |

### Animation Architecture
- **Ambient Motion:** Multi-depth twinkling starfield canvas, breathing Earth horizon rim glow, concentric ISS sonar pulse, and rising amber embers in the night rocket-launch footer.
- **Scroll & Navigation:** Top orbital scroll-progress bar, transparent-to-frosted-glass sticky navbar, sliding active-link underline, and `IntersectionObserver` staggered reveals.
- **Micro-Interactions:** 3D card perspective tilt, image zoom (`scale(1.07)`), diagonal cosmic button shimmer, spotlight carousel dimming, and full `@media (prefers-reduced-motion: reduce)` support.

---

## Project Structure

```text
Stellaris_NASA/
├── index.html                    # Home / Main NASA Dashboard
├── features.html                 # Space Technologies & Capabilities
├── projects.html                 # Missions & Exploration Directory
├── about-us.html                 # Vision, Timeline, Centers & Pioneers
├── contact-us.html               # Public Inquiries Form, HQ Info & FAQ
├── LICENSE                       # MIT License
├── README.md
└── assets/
    ├── css/
    │   ├── nasa-tokens.css       # Design tokens, typography & base reset
    │   ├── nasa-animations.css   # Keyframes, scroll reveals & reduced motion
    │   ├── nasa-layout.css       # Navbar, drawer, modals, toasts & footer
    │   └── nasa-pages.css        # Page-specific grids & components
    └── js/
        ├── nasa-data.js          # Curated NASA stories, missions, events & FAQs
        ├── nasa-animations.js    # Canvas effects, scroll UI, tilt & counters
        ├── nasa-shell.js         # Modals, quick search (Ctrl/Cmd+K) & toasts
        └── nasa-pages.js         # Home, Features, Projects & Contact logic
```

---

## Running Locally

Because the site uses static HTML, CSS, and vanilla JavaScript with zero build step, you can open `index.html` directly or serve the directory locally:

```bash
# Using Node.js (npx)
npx serve .

# Or using Python
python -m http.server 4173
```

Then open `http://localhost:4173` (or the port printed by your server) in your browser. Press `/` or `Ctrl+K` (`Cmd+K` on macOS) anywhere on the site to open quick search.

---

## Credits & License

- **Imagery:** Public-domain space, Earth observation, rover, telescope, and launch photography sourced from the [NASA Image and Video Library](https://images.nasa.gov/).
- **License:** Distributed under the [MIT License](LICENSE).
