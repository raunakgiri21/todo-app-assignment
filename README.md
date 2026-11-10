# Todo App

A mobile-first task management app built with React, Vite, Tailwind CSS, and React Router.

## Features

- Onboarding screen
- Weekly task grouping from Monday through Sunday
- Weekly open/completed task summaries
- Expandable weekly task cards
- All Tasks page with search
- Create and edit task bottom sheet
- Native-style centered date and time picker
- Task completion, editing, and deletion
- Shared task state across routes

## Requirements

- Node.js 18 or newer
- npm 9 or newer

## Setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown by Vite, normally `http://localhost:5173`.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project Architecture

The application follows a small feature-oriented architecture:

```text
src/
├── components/       Reusable UI components
├── context/          Global task state and context hooks
├── pages/             Route-level screens
├── services/          Pure task/date/query helpers
├── App.jsx            Router configuration
├── index.css          Tailwind theme and global styles
└── main.jsx           Application entry point and providers
```

### Pages

- `Onboarding.jsx` - Initial welcome screen at `/`
- `Home.jsx` - Weekly task overview at `/home`
- `AllTasks.jsx` - Searchable chronological task list at `/tasks`

### Components

- `HomeHeader` - Home heading and profile navigation
- `TodaySummary` - Today’s open-task summary
- `WeekCard` - Weekly grouping, counts, and expandable tasks
- `TaskRow` - Completion, edit, and delete actions
- `TaskFormSheet` - Shared create/edit bottom sheet
- `FloatingAddButton` - Opens the task form
- `SpanButton` - Shared link and submit button styling

### State Management

`TaskProvider` owns task state using React Context and `useReducer`.

The context exposes:

- `tasks` - Complete task collection
- `todayTasks` - Tasks scheduled for today
- `stats` - Total, open, completed, and today counts
- `weeks` - Tasks grouped by Monday–Sunday week
- `addTask`
- `updateTask`
- `toggleTask`
- `deleteTask`
- `searchTasks`

Wrap the application with `TaskProvider` in [main.jsx](src/main.jsx) so all routes share the same task state.

### Services

`taskService.js` contains pure, reusable functions for:

- Week boundaries and week keys
- Week formatting
- Task date formatting
- Weekly grouping
- Open-task counting
- Chronological sorting
- Search filtering

State mutations belong in `TaskProvider`; date and collection transformations belong in the service layer.

## Styling and Libraries

- Tailwind CSS v4 for component styling
- Lucide React for icons
- `date-fns` for date calculations and formatting
- `react-datepicker` for the centered date/time picker
- React Router for navigation

Global theme tokens are defined in [index.css](src/index.css).

## Development Guidelines

- Keep route-specific composition in `pages/`.
- Keep reusable visual elements in `components/`.
- Keep task state transitions in `TaskProvider`.
- Keep pure date, grouping, sorting, and filtering logic in `taskService.js`.
- Prefer Tailwind utility classes over page-specific CSS.
- Reuse `TaskRow` and `TaskFormSheet` instead of duplicating task interactions.
- Run `npm run lint` and `npm run build` before submitting changes.
