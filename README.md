# WoW Raid Team Manager

A modern Windows web application built with React, Chakra, Vite, atlaskit/pragmatic-drag-and-drop, Typescript and more dependencies for managing World of Warcraft TBC raid teams. This tool helps raid leaders organize their teams efficiently with an intuitive drag-and-drop interface.

<img width="1919" height="923" alt="image" src="https://github.com/user-attachments/assets/3a39cc69-ed3d-45d6-883f-72c7053a53e1" />
<img width="1919" height="919" alt="image" src="https://github.com/user-attachments/assets/2ec320a2-d079-426e-a38c-61b350ae9d18" />



## Features

- **Multiple Raid Teams Management**
  - Create and manage multiple raid team compositions
  - Easy switching between different raid teams
  - Customizable raid team names

- **Player Management**
  - Add players with their class and specialization
  - Visual class icons for easy identification
  - Support for all WoW classic TBC classes and specs:
    - Warriors (Arms, Fury, Protection)
    - Paladins (Holy, Protection, Retribution)
    - Hunters (Beast Mastery, Marksmanship, Survival)
    - Rogues (Assassination, Combat, Subtlety)
    - Priests (Discipline, Holy, Shadow)
    - Shamans (Elemental, Enhancement, Restoration)
    - Mages (Arcane, Fire, Frost)
    - Warlocks (Affliction, Demonology, Destruction)
    - Druids (Balance, Feral, Restoration)

- **Group Organization**
  - 5 main groups with 5 slots each
  - Drag-and-drop interface for easy player assignment
  - Visual feedback during drag operations

- **Filtering and Search**
  - Filter players by class/role
  - Clear and intuitive filtering interface

## Technical Details

- Built with React, Chakra UI, atlaskit/pragmatic-drag-and-drop, Vite and Typescript
- Localforage database for data persistence in localstorage

## Requirements

- Modern browser: Chrome, Firefox, Edge, Safari, or any browser that supports ES6+, JavaScript modules, and IndexedDB (used by localforage).
- Local Storage/IndexedDB support: Required to store data locally (localforage).
- JavaScript enabled: The app relies entirely on JavaScript.
- Node.js and npm (for development only): To install dependencies and run the development server.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
