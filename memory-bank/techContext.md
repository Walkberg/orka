# Tech Context

**Technologies Used:**
- **Backend:** TypeScript, NestJS, Prisma
- **Frontend:** TypeScript, React, Vite
- **Styling:** Tailwind CSS (likely, based on `tailwind.config.js` in `libs/ui`)
- **Package Manager:** pnpm (indicated by `pnpm-lock.yaml` and `pnpm-workspace.yaml`)
- **Monorepo Tooling:** Nx (indicated by `nx.json` and `project.json` files)

**Development Setup:**
- The project is structured as a monorepo managed by Nx.
- Dependencies are managed using pnpm.
- Frontend applications are built with Vite.
- Backend services are built with NestJS.

**Technical Constraints:**
- Adherence to the established monorepo structure and tooling (Nx, pnpm).
- Maintaining consistency across shared libraries (`libs/orka-react`, `libs/ui`).

**Dependencies:**
- **Backend:** NestJS core modules, Prisma client, various NestJS ecosystem packages.
- **Frontend:** React, React Router, and potentially state management libraries.
- **Shared Libraries:** UI components, API client implementations.

**Tool Usage Patterns:**
- **Nx:** Used for managing workspaces, building, testing, and linting projects within the monorepo.
- **pnpm:** Preferred package manager for efficient dependency management and workspace linking.
- **Prisma:** Used for database schema definition, migrations, and type-safe database access.
- **Vite:** Used as the build tool for frontend applications, offering fast development server startup.
