
# FocusFlow — Task Manager Application

## Overview
A premium, single-page task management app with localStorage persistence, featuring the "Satin Precision" design language — dense, tactile, and professional.

## Pages & Layout

### Sidebar (desktop)
- App logo + "FocusFlow" branding
- Navigation: Dashboard, My Tasks, Analytics (visual only for now)
- Dark/Light mode toggle at bottom

### Main Content Area

**Header (sticky)**
- Page title "Daily Tasks"
- Live search bar
- "New Task" button (blue, primary CTA)

**Stats Bar** — 4 cards in a row
- Total, Completed, Pending, Overdue counts
- Color-coded values (emerald, blue, rose)

**Progress Bar**
- Animated completion percentage

**Filter Bar**
- Status tabs: All / Pending / In Progress / Completed
- Priority dropdown filter
- "Clear Completed" bulk action

**Task List** — Drag & drop reorderable
- Card-based layout with priority badges, category tags, due dates
- Status cycling on click (Pending → In Progress → Completed)
- Hover-reveal edit/delete actions
- Overdue tasks highlighted with rose border
- Completed tasks with strikethrough + reduced opacity
- Empty state with icon and message

### Add/Edit Modal
- Title (required), Description, Priority select, Category select, Due Date picker
- Cancel / Create (or Save) buttons
- Backdrop blur overlay with spring animation

### Toast Notifications
- Bottom-right, auto-dismiss after 3 seconds
- Slide-up animation

## Key Interactions
- **Status cycling**: Click status icon to cycle Pending → In Progress → Completed
- **Drag & drop**: Reorder tasks via framer-motion's Reorder API
- **Dark mode**: Toggle persisted to localStorage, applied via class on `<html>`
- **All data in localStorage**: Tasks and theme preference survive refresh

## Technical Notes
- React + Tailwind + framer-motion (for drag-drop and animations)
- lucide-react for icons
- No backend, no database — pure localStorage
- Responsive: sidebar hidden on mobile, grid adapts
