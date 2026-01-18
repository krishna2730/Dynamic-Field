# 🔧 Dynamic Field Config

### URL: https://dynamicfield.vercel.app/

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Development](#development)

---

## 🎯 Overview

Turn any JSON into a beautiful, editable form instantly.

Stop hardcoding form fields for every new setting or configuration. This React application takes your JSON data, intelligently figures out the types (strings, numbers, arrays, objects), and renders a polished UI for you to edit and export.

---

## ✨ Features

- Smart Type Inference: Automatically detects if a field is a checkbox (boolean), text input (string), or number.
- Infinite Nesting: Handles deeply nested objects and arrays of objects without breaking a sweat.
- Drag & Drop: Just drop your .json file onto the page to start editing.
- Array Management: Add, remove, and reorder items in lists easily.
- Export Ready: One-click download of your modified JSON, or copy it to your clipboard.

---

## 🚀 Installation

### Prerequisites

- Node.js
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/krishna2730/Dynamic-Field-Config
cd json-config-renderer

# Install dependencies
npm install

# Start development server
npm start
```

- The application will open at `http://localhost:3000`

---

## 🛠️ Development

### Project Structure

```
src/
├── utils/
│   ├── schema.js             # Type inference logic
├── components/
|   ├── MainForm              # Main Component
│   ├── DynamicUI.jsx      # Field router
│   ├── Field.jsx          # Primitive inputs
│   ├── ObjectUI.jsx       # Object renderer
│   ├── ArrayUI.jsx        # Array renderer
│   └── Card.jsx           # Collapsible container
└── App.js
└── App.css      # Component styles
```

**Built By Krishna Viramgama**
