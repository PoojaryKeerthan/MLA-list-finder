# Frontend - MLA List Finder

## Overview
The frontend of the MLA List Finder is built using React with Vite for fast development. It includes a Redux store for managing location-based data and utilizes reusable components for better structure and maintainability.

## Setup & Installation
```sh
cd Frontend
npm install
# add .env file with API key in it 
npm run dev
```

## Key Components
- **NavBar.jsx**: Navigation bar for easy access
- **Mapcomponent.jsx**: Displays MLAs on an interactive map
- **MlaList.jsx**: Shows a list of MLAs based on the selected location
- **MlaDetails.jsx**: Provides details about a specific MLA
- **Loader.jsx**: Displays a loading animation

## State Management
Redux is used to manage the application's state, particularly the location-based MLA data.

## Deployment
The frontend is configured for deployment on **Vercel**.
```sh
vercel --prod
```

## Technologies Used
- React
- Vite
- Redux
- Tailwind CSS

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m "Add feature"`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a Pull Request