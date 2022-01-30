FUNCTIONAL COMPONENTS

- GLOBAL
  - event listener for device keyboard (going to LetterGrid)
- TOP NAVIGATION
  - Help
    - static content; no props
  - Statistics
    - dynamic content (dependent on whether puzzle is finished)
    - global state management + cookies
  - Settings
    - static content; global state managment
- LETTER GRID
  - incoming event listener for on-screen keyboard
    - options: letter, "enter", "backspace"
  - incoming event listener for device keyboard
  - outgoing flag for "hard mode" (when hint not used)
  - internal state manager
    - stores letter combos + validation states
    - function to run validation
    * outgoing event listener when line is run
- KEYBOARD
  - outgoing event listeners when on key press
    - options: letter, "enter", "backspace"
  - internal state manager
    - store validation states
    * restricts for "hard mode" (?)
