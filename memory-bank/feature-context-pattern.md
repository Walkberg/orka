# Feature Context Provider Pattern

This document describes a common pattern for organizing feature-specific logic and state in React applications, exemplified by the `ApplicationOrganizationsPage` feature. This pattern aims to encapsulate complex state management, data fetching, and business logic within a dedicated context provider, making it reusable and maintainable.

## Pattern Overview

The pattern consists of two main parts:

1.  **Page Component:** This is the top-level component responsible for rendering the UI for a specific feature. It acts as a container and orchestrates the display of various sub-components.
2.  **Context Provider Component:** This component manages the state, data fetching, and business logic for the feature. It uses React's Context API to make this functionality available to any child components.

## Components

### 1. Page Component (e.g., `ApplicationOrganizationsPage.tsx`)

*   **Purpose:** Renders the main UI for a feature and provides the necessary context.
*   **Structure:**
    *   Imports and renders UI components relevant to the feature (e.g., filters, lists).
    *   Wraps its child components with the feature's dedicated Context Provider.
*   **Example:**
    ```typescript
    import React from 'react';
    import { ApplicationOrganizationsProvider } from '../features/organizations/providers/ApplicationOrganizationsProvider';
    import OrganizationFilter from '../features/organizations/components/OrganizationFilter';
    import OrganizationList from '../features/organizations/components/OrganizationList';

    const ApplicationOrganizationsPage: React.FC = () => {
      return (
        <ApplicationOrganizationsProvider>
          <div>
            <h1>Organizations</h1>
            <OrganizationFilter />
            <OrganizationList />
          </div>
        </ApplicationOrganizationsProvider>
      );
    };

    export default ApplicationOrganizationsPage;
    ```

### 2. Context Provider Component (e.g., `ApplicationOrganizationsProvider.tsx`)

*   **Purpose:** Manages the state, data fetching, and business logic for a specific feature.
*   **Key Responsibilities:**
    *   **State Management:** Uses `useState` to hold feature-specific data (e.g., lists of items, loading states, search terms, sort orders).
    *   **Data Fetching:** Leverages custom hooks (e.g., `useOrka` from `@orka-react`) and API clients to fetch and mutate data. `useEffect` is commonly used for initial data loading.
    *   **Business Logic:** Implements operations like filtering, sorting, creating, updating, or deleting entities relevant to the feature.
    *   **Context API:**
        *   Defines a `ContextType` interface for the data and functions to be exposed.
        *   Creates a `Context` object using `createContext`.
        *   Provides the `Context` value (state and functions) to its children using `<Context.Provider>`.
    *   **Custom Hook for Consumption:** Exposes a custom hook (e.g., `useApplicationOrganizations`) that simplifies accessing the context. This hook includes error handling to ensure it's used within the correct provider.
*   **Example Snippets:**
    ```typescript
    // Defining the context type and creating the context
    export type OrganizationSortBy = 'name' | 'createdAt' | 'default';
    export interface ApplicationOrganizationsContextType {
      organizations: Organization[];
      loading: boolean;
      searchTerm: string;
      sortBy: OrganizationSortBy;
      updateSearch: (search: string) => void;
      updateSortBy: (value: OrganizationSortBy) => void;
      createOrganization: (organizationNew: OrganizationNew, cb: OrganizationCreatedCallback) => Promise<void>;
    }
    const ApplicationOrganizationsContext = createContext<ApplicationOrganizationsContextType | undefined>(undefined);

    // The Provider component
    export function ApplicationOrganizationsProvider({ children }: { children: ReactNode }) {
      // ... state and logic ...
      const contextValue: ApplicationOrganizationsContextType = {
        organizations: sortedOrganizations,
        loading,
        searchTerm,
        sortBy,
        updateSearch,
        updateSortBy,
        createOrganization: handleCreateOrganization,
      };

      return (
        <ApplicationOrganizationsContext.Provider value={contextValue}>
          {children}
        </ApplicationOrganizationsContext.Provider>
      );
    }

    // Custom hook for consuming the context
    export const useApplicationOrganizations = () => {
      const context = useContext(ApplicationOrganizationsContext);
      if (context === undefined) {
        throw new Error('useApplicationOrganizations must be used within a ApplicationOrganizationsProvider');
      }
      return context;
    };
    ```

## Benefits of this Pattern

*   **Encapsulation:** Keeps feature-specific logic and state contained, reducing complexity in parent components.
*   **Reusability:** The provider and its associated hook can be reused across different pages or components that require access to the same feature data.
*   **Maintainability:** Changes to the feature's logic or state are localized within the provider component.
*   **Testability:** The provider component can be tested in isolation, and components consuming the context can be tested by mocking the context.
*   **Readability:** Clearly separates UI rendering from data management and business logic.

This pattern is highly effective for building scalable and organized React applications, especially when dealing with complex features that involve data fetching and state management.
