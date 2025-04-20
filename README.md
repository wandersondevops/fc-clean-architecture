# Clean Architecture Project

This project demonstrates the implementation of Clean Architecture principles in a TypeScript application. It showcases domain-driven design, use cases, and various design patterns to create a maintainable and testable codebase.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Key Features](#key-features)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [API Endpoints](#api-endpoints)
- [Design Patterns](#design-patterns)
- [Project Structure](#project-structure)

## Overview

This application implements a simple domain model with entities like Customer and Product, following Clean Architecture principles. It demonstrates how to separate business rules from external concerns like databases and UI, making the system more maintainable and testable.

## Architecture

The project follows the Clean Architecture pattern with the following layers:

1. **Domain Layer**: Contains business entities, value objects, and domain services
2. **Use Case Layer**: Implements application-specific business rules
3. **Infrastructure Layer**: Provides implementations for repositories, API, and other external concerns

## Key Features

- Domain-driven design with entities, value objects, and aggregates
- Use case implementation with input/output DTOs
- Repository pattern for data persistence
- Notification pattern for error handling
- Factory pattern for object creation
- Event-driven architecture
- Comprehensive testing (unit, integration, and end-to-end)

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/wandersondevops/fc-clean-architecture.git
   cd fc-clean-architecture
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running Tests

The project includes comprehensive test suites at different levels:

### Run all tests:
```bash
npm test
```

### Run specific test suites:
```bash
# Domain tests
npm test -- --testPathPattern=src/domain

# Use case tests
npm test -- --testPathPattern=src/usecase

# Integration tests
npm test -- --testPathPattern=integration.spec

# End-to-end tests
npm test -- --testPathPattern=e2e.spec
```

## API Endpoints

The application exposes RESTful API endpoints for Customers and Products:

### Customer Endpoints

- `POST /customer`: Create a new customer
- `GET /customer`: List all customers (supports JSON and XML formats)

### Product Endpoints

- `POST /product`: Create a new product
- `GET /product`: List all products (supports JSON and XML formats)

## Design Patterns

### Notification Pattern

The project implements the notification pattern to accumulate validation errors instead of throwing exceptions immediately. This allows for collecting multiple errors at once and providing better feedback to users.

Example:
```typescript
// Product entity with notification pattern
validate(): void {
  ProductValidatorFactory.create().validate(this);
}
```

### Repository Pattern

The repository pattern is used to abstract data access logic:

```typescript
// Product repository interface
export default interface ProductRepositoryInterface {
  create(entity: Product): Promise<void>;
  update(entity: Product): Promise<void>;
  find(id: string): Promise<Product>;
  findAll(): Promise<Product[]>;
}
```

### Factory Pattern

Factories are used to create complex objects:

```typescript
// Product factory
export default class ProductFactory {
  public static create(
    type: string,
    name: string,
    price: number
  ): Product | ProductB {
    // Implementation details
  }
}
```

## Project Structure

```
src/
├── domain/               # Domain layer
│   ├── @shared/          # Shared domain components
│   ├── customer/         # Customer domain
│   └── product/          # Product domain
├── infrastructure/       # Infrastructure layer
│   ├── api/              # API implementation
│   ├── customer/         # Customer infrastructure
│   └── product/          # Product infrastructure
└── usecase/              # Use case layer
    ├── customer/         # Customer use cases
    └── product/          # Product use cases
```

Each domain entity (Customer, Product) has its own directory structure with:

- Entities
- Value objects
- Repositories
- Services
- Factories
- Validators

Use cases are organized by entity and operation (create, find, list, update).

## Recent Implementations

1. **Product Use Case Integration Tests**: Added integration tests for Product use cases (create, list, update) to ensure they work correctly with the actual repository implementation.

2. **Product API Endpoints**: Implemented RESTful API endpoints for Products with support for both JSON and XML formats, including end-to-end tests.

3. **Notification Pattern for Product**: Implemented the notification pattern for the Product entity to accumulate validation errors instead of throwing exceptions immediately, with comprehensive tests including a test that accumulates multiple errors at once.
