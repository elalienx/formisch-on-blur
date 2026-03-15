# Formisch on blur

A quick demo to see if is possible to update the UI state on blur instead of inmediately on changes.
This will allow the user to calmy type in the inputs and only see an error message when it clicks outside the field.

## Project structure

playwright/App.spec.tsx 👈 Tests
src/
-- styles/
-- App.tsx 👈 Form entry point
-- InputField.tsx 👈 Form field with label and error handling.

## Run commands

- Run app: `pnpm dev`
- Run tests in UI mode: `pnpm playwright --ui`
