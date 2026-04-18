# Nile-Connect Hub Frontend

This represents the frontend for the Nile Connect platform, adopting a Neo-Brutalist design language. 

## Folder Structure

- `/src/components/`: Reusable, purely presentational Neo-Brutalist UI components (Buttons, Cards, Modals, Inputs). Use these to ensure consistency.
- `/src/layouts/`: Dashboard and portal shell wrappers defining navigation and responsive structures for roles.
- `/src/pages/`: Contains role-segregated top-level page views (`/student`, `/employer`, `/staff`) tying components and business logic together.
- `/src/lib/`: Reusable utility functions and third-party configuration (e.g., Supabase client).
- `/src/hooks/`: Custom React hooks, especially for data fetching or global state.

## Conventions
- **Styling**: Tailwind CSS is extensively used inline. For complex pseudo-elements and animations, check `index.css`.
- **Aesthetics**: Neo-brutalism relies on bold borders (`border-3`, `border-black`), high contrast palettes (Nile White, Nile Green, Nile Blue), explicit shadows (`shadow-brutalist`), and all caps text (`uppercase tracking-widest`).
- **Component Naming**: PascalCase for components.
- **Routing**: Setup centrally in `App.tsx` utilizing React Router. Keep layout wrappers outside of page transitions.
