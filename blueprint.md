# Project Blueprint

## Overview

This project is a modern web application featuring a Toto Number Generator. It showcases the use of Web Components, CSS Variables, and responsive design to create a clean and functional user experience.

## Implemented Features

### 1. Toto Number Generator
*   A custom Web Component (`<toto-generator>`) that generates a set of 6 unique random numbers between 1 and 49.
*   Includes a "Generate" button to refresh the numbers.
*   Uses Shadow DOM for encapsulated styling and logic.

### 2. Day/Night UI (Theme Switcher)
*   **Theme Management:** Uses CSS Custom Properties (variables) defined in `:root` and `:root[data-theme="dark"]` to manage colors across the application.
*   **Theme Switcher Component:** A custom Web Component (`<theme-switcher>`) that provides a toggle button with visual icons (Sun for Light mode, Moon for Dark mode) for the user to switch between Light (Day) and Dark (Night) modes.
*   **Persistence:** Saves the user's theme preference in `localStorage` to ensure the selected theme is maintained across page reloads.
*   **Smooth Transitions:** Implements CSS transitions for background and color changes to provide a polished feel.
*   **Placement:** The switcher is fixed to the top right corner of the screen for easy access.

### 4. Robotic Companion
*   **Futuristic Robot:** A custom Web Component (`<futuristic-robot>`) featuring a detailed SVG-based robotic assistant.
*   **Theme-Responsive Colors:** The robot dynamically changes its appearance based on the active theme:
    *   **Day Mode:** Sleek, brushed silver metallic finish with a subtle metallic shimmer.
    *   **Night Mode:** Brilliant, shiny gold finish with a radiant, high-intensity gold glow.
*   **Animations:** The robot features multi-layered CSS animations including floating, blinking eyes, and a rotating head.
*   **Responsive Layout:** The interface automatically switches to a vertical layout on smaller screens, keeping the robot and lottery terminal stacked.
*   **Themed Integration:** The robot's metallic finish and glowing accents are driven by the same CSS variables as the rest of the application, ensuring it perfectly matches both Day and Night modes.
