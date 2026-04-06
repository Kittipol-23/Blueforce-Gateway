const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf-8');

// Replace hardcoded values with variables
const replacements = [
  ['#ffffff', 'var(--gradient-bg)'],
  ['background-color: #fff;', 'background-color: var(--white-bg);'],
  ['color: #fff;', 'color: var(--white-text);'],
  ['background-color: #000;', 'background-color: var(--black-bg);'],
  ['color: #000;', 'color: var(--black-text);'],
  ['border: 2px solid #111;', 'border: 2px solid var(--line-color);'],
  ['border: 1px solid #111;', 'border: 1px solid var(--line-color);'],
  ['border: 1px solid #000;', 'border: 1px solid var(--line-color);'],
  ['background: #fff;', 'background: var(--white-bg);'],
  ['background: #000;', 'background: var(--black-bg);'],
  ['color: #333;', 'color: var(--dark-text);'],
  ['background-color: #fafafa;', 'background-color: var(--careers-bg);'],
  ['background-color: #f4f4f6; color: #000;', 'background-color: var(--bg-color); color: var(--text-color);'],
  ['color: #111;', 'color: var(--text-color);']
];

for (let [search, replace] of replacements) {
    css = css.split(search).join(replace);
}

// Add dark mode to :root
const rootVars = `  --white-bg: #fff;
  --black-bg: #000;
  --white-text: #fff;
  --black-text: #000;
  --dark-text: #333;
  --careers-bg: #fafafa;
  --gradient-bg: #ffffff;`;

const darkModeVars = `
body.dark-mode {
  --bg-color: #0a0a0a;
  --text-color: #e0e0e0;
  --accent-blue: #00aaff;
  --node-bg: #1a1a1a;
  --line-color: #444;
  --font-mono: 'Space Mono', monospace;
  --font-sans: 'Inter', sans-serif;
  --white-bg: #222;
  --black-bg: #444;
  --white-text: #eee;
  --black-text: #fff;
  --dark-text: #ccc;
  --careers-bg: #111;
  --gradient-bg: #111111;
}
`;

// Replace :root { ... } with :root { ... rootVars } \n darkModeVars
css = css.replace(/(:root\s*\{)([^}]*)(\})/, (match, p1, p2, p3) => {
    return p1 + p2 + rootVars + '\n' + p3 + darkModeVars;
});

// Update the toggle button styles
css += `
/* Theme Toggle */
.theme-toggle {
  cursor: pointer;
  margin-left: 15px;
  font-size: 14px;
}
.theme-toggle:hover {
  opacity: 0.8;
}

.theme-toggle-icon {
  user-select: none;
}
`;

fs.writeFileSync('styles.css', css);
console.log('styles.css updated');
