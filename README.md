# Dynamic Form Generator

A web application that dynamically generates forms based on JSON schema. The app provides a JSON editor, real-time form preview, and allows downloading submitted form data as JSON.

## Features
- *JSON Editor*: Syntax highlighting, real-time validation, and error feedback.
- *Form Preview*: Dynamically generate and render forms from a JSON schema.
- *Dark Mode*: Full support for light and dark themes.
- *Field Types*: Supports all major HTML input types like text, email, password, radio, checkbox, and more.
- *Download Functionality*: Download submitted form data as JSON.
- *Tailwind CSS*: Styled consistently for a modern UI.
- *Responsive Design*: Works seamlessly across desktop and mobile devices.

---

## Project Structure

dynamic-form-generator/
├── public/
│   └── index.html              # Root HTML file
├── src/
│   ├── components/
│   │   ├── FormGenerator.tsx   # Component for form generation logic
│   │   ├── JsonEditor.tsx      # Component for the JSON editor
│   │   ├── FormPreview.tsx     # Component for real-time form preview
│   ├── App.tsx                 # Main app entry point
│   ├── index.tsx               # React app bootstrapping
│   ├── styles/
│   │   └── tailwind.css        # Tailwind CSS styles
│   ├── types/
│   │   └── schema.d.ts         # Type definitions for the JSON schema
│   └── utils/
│       ├── validateJson.ts     # Utility for JSON schema validation
│       └── downloadJson.ts     # Utility for downloading JSON data
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration for Tailwind
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Documentation
---

## Setup Instructions

### Prerequisites
- *Node.js* (v16 or higher)
- *npm* or *yarn*

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/dynamic-form-generator.git
   cd dynamic-form-generator

2. Install dependencies:

npm install

or

yarn install


3. Start the development server:

npm start

or

yarn start


4. Open the application in your browser:

http://localhost:3000




---

Example JSON Schemas

Basic Form

{
  "formTitle": "Basic Information",
  "formDescription": "Please fill out this basic information.",
  "fields": [
    {
      "id": "name",
      "type": "text",
      "label": "Full Name",
      "required": true,
      "placeholder": "Enter your full name"
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email Address",
      "required": true,
      "placeholder": "you@example.com"
    }
  ]
}

Advanced Form with Various Input Types

{
  "formTitle": "Project Survey",
  "formDescription": "Provide details about your project needs.",
  "fields": [
    {
      "id": "company",
      "type": "text",
      "label": "Company Name",
      "required": true
    },
    {
      "id": "size",
      "type": "select",
      "label": "Company Size",
      "options": [
        { "value": "small", "label": "1-50 employees" },
        { "value": "medium", "label": "51-200 employees" },
        { "value": "large", "label": "200+ employees" }
      ],
      "required": true
    },
    {
      "id": "timeline",
      "type": "radio",
      "label": "Project Timeline",
      "options": [
        { "value": "1_month", "label": "Immediate (within 1 month)" },
        { "value": "3_months", "label": "Short term (1-3 months)" },
        { "value": "long_term", "label": "Long term (3+ months)" }
      ],
      "required": true
    },
    {
      "id": "comments",
      "type": "textarea",
      "label": "Additional Comments",
      "placeholder": "Enter any additional details here..."
    }
  ]
}


---

Local Development Guide

Commands

Start the Development Server

npm start

Build for Production

npm run build

Linting and Formatting

npm run lint
npm run format


Tailwind CSS Integration

Modify the tailwind.config.js file to adjust styles:

module.exports = {
  content: ['./src//*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {}
  },
  plugins: []
};
