# Header Blur Update Task

## Tasks
- [x] Modify Header.tsx to use backdrop-blur revealing hero image instead of solid background
  - Remove `bg-black/40` from header element
  - Add `relative` positioning to header
  - Add absolute overlay div with `bg-black/40` for text contrast
  - Ensure content container has `relative z-10`
