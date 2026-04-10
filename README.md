# ROG Strix G17 (2023) - Complete Website

A fully responsive, animated clone of the ASUS ROG Strix G17 2023 gaming laptop website.

This project demonstrates a modern landing page experience with custom interactions, canvas animations, responsive layout, and rich visual design.

## 🚀 Features

- **Custom Cursor**: Dual-layer cursor with hover state effects
- **Particle System**: Interactive canvas animation in the hero section
- **Scroll Animations**: Section reveal effects powered by Intersection Observer
- **Audio Visualizer**: Dynamic audio-style canvas visualization
- **RGB Keyboard Controller**: Interactive keyboard lighting color selector
- **Temperature Simulation**: Animated CPU/GPU temperature display panel
- **Testimonial Slider**: Touch-enabled carousel for reviews
- **Design Gallery**: Interactive image gallery with product highlights
- **Responsive Design**: Mobile-first layout and tablet/desktop support

## 📁 Project Structure

```
rog-strix-g17-2023/
├── index.html              # Main website page
├── css/
│   ├── main.css           # Core styles and layout
│   ├── animations.css     # Keyframes and animation rules
│   └── responsive.css     # Breakpoints and responsive styling
├── js/
│   ├── main.js            # Page interaction logic
│   ├── canvas.js          # Canvas-based visual effects
│   └── animations.js      # Scroll reveal and animation triggers
├── images/
│   ├── cooling/           # Thermal system visuals
│   ├── design/            # Chassis and product design visuals
│   ├── display/           # Display and screen imagery
│   ├── icons/             # SVG and icon graphics
│   ├── keyboard/          # Keyboard and RGB imagery
│   ├── logo/              # ROG brand assets
│   ├── performance/       # CPU/GPU/SSD visuals
│   ├── products/          # Laptop product imagery
│   ├── software/          # Armoury Crate and software visuals
│   └── testimonials/      # Customer avatars and quotes
└── README.md
```

## 🛠️ Setup

1. Clone or download the repository.
2. Open the project folder in your code editor.
3. Launch `index.html` directly in a browser.
4. Alternatively, serve the project using a local development server for best results.

### Recommended local server

```bash
npx http-server .
```

or

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## 💡 Usage

- Edit `css/main.css` to update base styles and layout.
- Edit `css/animations.css` to adjust motion effects.
- Edit `css/responsive.css` to refine mobile/tablet breakpoints.
- Edit `js/main.js`, `js/canvas.js`, and `js/animations.js` to customize interactive behavior.
- Replace image files inside `images/` folders to update the visual content.

## 🧪 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🤝 Credits

- Fonts: Google Fonts (`Orbitron`, `Roboto`)
- Icons: Custom SVG graphics
- Imagery: ASUS ROG product visuals

## 📌 Notes

- This repository is a frontend clone and does not include any backend functionality.
- For optimal animation performance, use a modern browser with hardware acceleration enabled.
