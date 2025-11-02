# System Patterns

**System Architecture:**
The Orka project follows a modular architecture, with distinct applications and libraries managed within a monorepo. Key components include:
- `apps/orka`: A backend NestJS application, likely handling core API logic and data persistence.
- `apps/orka-app`: A frontend React application, serving as the primary user interface.
- `apps/orka-react-example`: Another frontend React application, possibly for demonstration or testing purposes.
- `libs/orka-react`: A shared React library, containing reusable UI components and logic.
- `libs/ui`: A shared UI component library, providing base UI elements.

**Key Technical Decisions:**
- **Monorepo:** Utilizing a monorepo structure for managing multiple related projects.
- **Backend Framework:** NestJS for the backend API, leveraging TypeScript.
- **Frontend Framework:** React for frontend applications, likely with a state management solution.
- **UI Components:** A dedicated library (`libs/ui`) for shared UI elements, promoting consistency.
- **Database:** Prisma is used for ORM and database management, as indicated by `prisma/schema.prisma` and migration files.

**Design Patterns in Use:**
- **Domain-Driven Design (DDD):** Suggested by the structure within `apps/orka/src/modules/`, indicating separation of concerns into domain, application, and infrastructure layers.
- **Repository Pattern:** Evident in files like `application.repository.ts` and `user.repository.ts`.
- **Dependency Injection:** A core pattern in NestJS.

**Component Relationships:**
- `apps/orka` (backend) provides APIs consumed by `apps/orka-app` (frontend).
- `libs/orka-react` and `libs/ui` are shared across frontend applications.

**Critical Implementation Paths:**
- User authentication and authorization flow.
- Application and organization creation/management workflows.
- Data persistence and retrieval via Prisma.

**Design Pattern** 
when implementing/refactoring a new page/feature in the react application you should see if you can apply one pattern in the 
feature-context-pattern.md
