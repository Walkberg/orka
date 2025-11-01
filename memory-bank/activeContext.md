# Active Context

## Current Work
Refactoring user management logic into a dedicated `UserModule` to improve modularity and separation of concerns.

## Recent Changes
- Created the foundational structure for the `UserModule` (`user/application/dto`, `user/application/usecases`, `user/infrastructure`, `user/domain`).
- Developed DTOs for user operations: `CreateUserDto` and `GetUsersDto`.
- Moved and refactored existing user use cases (`GetUsersUseCase`, `CreateUserUseCase`) to `apps/orka/src/modules/user/application/usecases/users.usecase.ts`, adapting them to use the new DTOs and injecting `UserRepository`.
- Implemented `UserController` in `apps/orka/src/modules/user/infrastructure/user.controller.ts`, utilizing DTOs and maintaining the `/applications/:appId/users` route structure for application context.
- Created `apps/orka/src/modules/user/user.module.ts`, registering the `UserController`, use cases, and placeholder repositories, while also exporting key components.
- Updated `apps/orka/src/modules/application/application.module.ts` to remove user-related dependencies (like `ApplicationUsersController`, `GetUsersUseCase`, `CreateUserUseCase`) and imported the new `UserModule`.

## Next Steps
- Ensure the `User` entity and relevant repositories (e.g., `ApplicationMemberRepository`, `UserRepository`) are correctly defined and accessible across modules.
- Finalize memory bank updates to reflect the current state and decisions made.

## Active Decisions
- The route structure `/applications/:appId/users` was maintained in the `UserController` to preserve the application context for user operations, aligning with the original client implementation. This decision might require further discussion based on the overall API design strategy.
- The `UserRepository` is now injected into the user use cases, replacing `ApplicationMemberRepository`. This assumes `UserRepository` has the necessary methods (`findManyByApplicationId`, `create`) or that these methods will be implemented.
- The `ApplicationMemberRepository` is still provided in `UserModule` as a placeholder, but its relevance needs to be confirmed.

## Project Insights
- The project utilizes a modular architecture pattern common in NestJS, emphasizing the separation of concerns through modules, controllers, use cases, and repositories.
- The refactoring effort into a dedicated `UserModule` enhances code maintainability, promotes reusability, and adheres to SOLID principles.
- The introduction of DTOs improves request data validation and type safety.
