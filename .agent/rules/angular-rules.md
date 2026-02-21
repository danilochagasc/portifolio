---
trigger: model_decision
description: Should be used when working in a angular front end
---

---
context: true
priority: high
scope: project
---

You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking.
- Prefer type inference when the type is obvious.
- Avoid the `any` type; use `unknown` when the type is uncertain.

## Angular Best Practices

- Always use standalone components over NgModules.
- Do NOT set `standalone: true` inside Angular decorators (it is the default in Angular v20+).
- Use signals for state management.
- Implement lazy loading for feature routes.
- Do NOT use `@HostBinding` and `@HostListener` decorators. Define host bindings within the `host` object of the `@Component` or `@Directive` decorator instead.
- Use `NgOptimizedImage` for all static images.
  - Note: `NgOptimizedImage` does not support inline base64 images.

## Accessibility Requirements

- Must pass all AXE checks.
- Must follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility.
- Use `input()` and `output()` functions instead of decorators.
- Use `computed()` for derived state.
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in the `@Component` decorator.
- Prefer inline templates for small components.
- Prefer Reactive Forms over Template-driven forms.
- Do NOT use `ngClass`; use `class` bindings instead.
- Do NOT use `ngStyle`; use `style` bindings instead.
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state.
- Use `computed()` for derived state.
- Keep state transformations pure and predictable.
- Do NOT use `mutate` on signals; use `update` or `set` instead.

## Templates

- Keep templates simple and avoid complex logic.
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`.
- Use the `async` pipe to handle observables.
- Do not assume globals (e.g., `new Date()`) are available in templates.
- Do not write arrow functions in templates (not supported).

## Services

- Design services around a single responsibility.
- Use `providedIn: 'root'` for singleton services.
- Use the `inject()` function instead of constructor injection.

## Project Structure

The project MUST follow this semantic folder structure inside `src/app/`:

```
src/app/
├── core/              # Singleton services, guards, interceptors
│   ├── services/      # Application-wide services
│   ├── guards/        # Route guards
│   └── interceptors/  # HTTP interceptors
├── shared/            # Reusable components, directives, pipes
│   ├── components/    # Shared UI components
│   ├── directives/    # Custom directives
│   ├── pipes/           # Custom pipes
│   └── models/          # Global interfaces and data models
├── features/          # Feature modules organized by domain
│   └── [feature]/     # Each feature has its own folder
│       ├── components/
│       ├── services/
│       |── pages/
│       └── models/      # Feature-specific interfaces and models
└── pages/             # Top-level route pages (if not inside features)
```

### Structure Rules

- **Components**: Place in `components/` folders within their respective feature or shared directory
- **Services**: Place in `services/` folders - core services in `core/services/`, feature-specific in `features/[feature]/services/`
- **Pages**: Place in `pages/` folders - these are routable components representing full views
- Use **lowercase with hyphens** for folder and file names (e.g., `user-profile/`, `auth-service.ts`)
- Keep related files together (component, template, styles, tests in the same folder)
- Feature folders should be named after the domain they represent (e.g., `auth/`, `dashboard/`, `user-management/`)
- **All pages MUST be responsive** - desktop and mobile friendly. Use CSS media queries, flexbox, and/or CSS grid to ensure proper layouts across all screen sizes
- **Use CSS variables for colors** - Define all colors as CSS custom properties (e.g., `--primary-color`, `--background-color`) in `styles.css` and reference them throughout the application. Never hardcode color values directly in component styles

## Code Generation (MANDATORY)

**All new Angular artifacts MUST be created using the Angular CLI.** Do NOT manually create component, service, directive, pipe, or guard files.

**Avoid using too many comments while generating code

### Required CLI Commands

- **Components**: `ng generate component [path]` or `ng g c [path]`
- **Services**: `ng generate service [path]` or `ng g s [path]`
- **Directives**: `ng generate directive [path]` or `ng g d [path]`
- **Pipes**: `ng generate pipe [path]` or `ng g p [path]`
- **Guards**: `ng generate guard [path]` or `ng g g [path]`
- **Interceptors**: `ng generate interceptor [path]` or `ng g interceptor [path]`

### CLI Usage Examples

```bash
# Generate a shared component
ng g c shared/components/button

# Generate a feature page
ng g c features/auth/pages/login

# Generate a core service
ng g s core/services/auth

# Generate a feature-specific service
ng g s features/dashboard/services/analytics

# Generate a guard
ng g g core/guards/auth
```

### CLI Options

- Use `--skip-tests` only if explicitly requested
- Use `--inline-template` for small components
- Use `--inline-style` for components with minimal styling
- Always let the CLI handle file naming conventions

## Official Documentation (MANDATORY)

**NEVER invent information about Angular.** When in doubt about APIs, syntax, or behavior, you MUST consult the official documentation file:

- **Reference file**: `.agent/llms/angular-docs.txt`

### Consultation Rules

- Before using an API or feature you are unsure of, consult the documentation file.
- Do not assume behaviors - verify in the official docs.
- If the information is missing from the docs, inform the user and ask for guidance.