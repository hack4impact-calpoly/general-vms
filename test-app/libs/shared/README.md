# General VMS Shared Package

This package contains content that should is shared in some way between the other packages (i.e. frontend, backend). This is helpful for defining types that both packages need and avoiding duplicating the type definitions.

Common use-cases for this are defining types for data that you are sending from the frontend to the backend. Oftentimes, both packages will need those types in some way to safely compile with `tsc`.

## What goes in here?

- Type definitions
- Common functions (like date converters)
- Model transformers
  - These are special implementations of interfaces that describe how to transform and undo a transform for data being sent from the frontend to backend and vice versa.
  - This can be especially helpful for stuff with `Date`s, since you are likely to want to convert dates to numbers before sending.
