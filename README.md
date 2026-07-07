[![Static Badge](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-blue)](https://github.com/kkrugley/safepaws/blob/main/LICENSE)
[![Static Badge](https://img.shields.io/badge/Latest-Release-brightgreen)](https://github.com/kkrugley/safepaws/releases)
[![Static Badge](https://img.shields.io/badge/OpenCollective-SafePaws-blue?logo=opencollective&logoColor=white)](https://opencollective.com/safepawsorganization)

## What is SafePaws?

SafePaws is an open, non-commercial project that provides free blueprints and instructions for building warm outdoor shelters, water stations, and feeding devices for stray cats. The designs are optimised for laser-cut plywood and 3D-printed parts — simple enough for anyone to build with minimal tools and experience.

Project website: **https://safepaws.vercel.app**  
GitHub: **https://github.com/kkrugley/safepaws**  
Author: Pavel Kruhlei

---

## Product Line

| Product | Category | Status | Description |
|---------|----------|--------|-------------|
| **Cozy Shelter** | Shelter | Available | Compact shelter for 1–2 cats. 40×40×30 cm. Double walls with 40 mm insulation gap, L-shaped vestibule, sloped roof, 2 bowl holders. Laser-cut plywood. Build cost ~€30. |
| **Family Shelter** | Shelter | Available | Large shelter for 3–5 cats. 80×50×45 cm. Insulated walls, second-floor level, L-shaped vestibule, sloped roof, 4 bowl holders. Laser-cut plywood. Build cost ~€50. |
| **PurrTap** | Hydration | Coming soon | Stationary water dispenser with a 3D-printed base and standard PET bottle. Refill by replacing the bottle. PETG/ABS plastic. Print time ~4 h, assembly ~10 min. Build cost ~€10. |
| **EDC Feeder** | Feeding | Coming soon | Pocket-sized portion feeder for dry food. 3D-printed on a standard FDM printer. PETG/ABS. Print time ~3 h. Build cost ~€15. |

All shelters share the same design principles: double walls with a 40 mm insulation gap, L-shaped wind-blocking entrance, raised base, interlocking laser-cut joints, and assembly in 1–2 hours.

---

## Repository Contents

- **`cad-source/`** — CAD source files (`.m3d`, `.a3d`, `.cdw`, `.stp`, `.blend`, `.stl`), DXF and SVG cutting files, nested layouts for various sheet sizes, assembly manuals (PDF), and warning-plate designs.
- **`website/`** — Next.js 16 web application (multilingual: RU, EN, BE, PL) with product catalog, download centre, user story map, and materials calculator.
- **`branding/`** — Logos, mascot, OG image, and brand assets.

---

## Getting Started

1. Choose a product from the [catalog](https://safepaws.vercel.app/solutions).
2. Download the corresponding cutting files (DXF for laser cutting, STL for 3D printing).
3. Fabricate the parts at a local workshop, makerspace, or fab lab.
4. Follow the step-by-step assembly manual in this repository (also available on the website).
5. Install the shelter in a suitable location and share your story.

Full assembly manuals are available in PDF format under each product's directory in `cad-source/`.

---

## How to Contribute

Contributions of all kinds are welcome:

- **Build a shelter** for cats in your neighbourhood and share your experience on Instagram ([@safepaws.help](https://www.instagram.com/safepaws.help/)) or Telegram ([@safepaws_help](https://t.me/safepaws_help)).
- **Improve documentation** — refine or write clearer instructions, add new languages.
- **Improve website** — Improve existing translations or add new languages.
- **Add new layouts** — contribute nesting arrangements for other standard sheet sizes.
- **Report issues** — open a GitHub issue for bugs, problems, or suggestions.
- **Provide feedback** — real-world use reports help improve the designs.
- **Support financially** via [Open Collective](https://opencollective.com/safepawsorganization), [Ko-fi](https://ko-fi.com/safepawsorganization), or [Buy Me a Coffee](https://buymeacoffee.com/safepawsorganization).

Please open an issue or pull request for any proposed changes. For significant modifications, start a discussion first.

---

## Cloning

```sh
git clone --depth=1 https://github.com/kkrugley/safepaws.git
```

The `--depth=1` flag avoids downloading the full git history (hundreds of MB).

---

## License

This project is licensed under **CC BY-NC-ND 4.0** (Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International).

Copyright © 2025 Pavel Kruhlei

**In short:**
- ✅ You may download files, build shelters, and share the project for non-commercial purposes.
- ✅ You may use the shelters in volunteer work, educational projects, and community initiatives.
- ❌ You may not sell these designs or products based on them.
- ❌ You may not distribute modified versions without prior permission.

Full license text: [`LICENSE`](LICENSE)

**Attribution:** "SafePaws Shelters" by Pavel Kruhlei (2025) — [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/).

For commercial licensing or partnerships, contact: safepaws.help@proton.me

---

*Build one shelter — change one small world.*
