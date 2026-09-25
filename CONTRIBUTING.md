# Contributing to MISE

Thank you for your interest in contributing to MISE — The Kitchen Journal. We welcome contributions that improve recipe usability, platform performance, accessibility, and documentation accuracy.

---

## Development Setup

### Prerequisites
* **Node.js**: v18.0.0 or later
* **npm**: v9.0.0 or later
* **Git**

### Installation
1. Fork and clone the repository:
   ```bash
   git clone https://github.com/VinayKrishna-7/Mise.git
   cd Mise
   ```
2. Install all dependencies across the root, client, and server:
   ```bash
   npm run install:all
   ```
3. Start both the client and server concurrently:
   ```bash
   npm run dev
   ```
   * Client: `http://localhost:5173`
   * Server API: `http://localhost:5000/api`

---

## Coding Standards & Guidelines

* **Restrained & Editorial Design**: Follow the established design system — Plus Jakarta Sans for UI/body, Outfit for headings, pure white cards on `#F8FAFC`, dark mode with `#1E293B` on `#0F172A`, and culinary orange (`#F97316`) accents. Avoid over-designed effects, excessive gradients, or AI buzzwords.
* **Database Integrity**: The 123 foundation archive recipes are marked with `isSystem: true` and must remain protected from unauthorized deletions.
* **Component Modularity**: Keep React components focused, accessible, and properly typed or validated.
* **Error Handling**: Follow standard Express error-handling middleware patterns; never crash unhandled promises.

---

## Testing

Before submitting a pull request, run the automated test suite and ensure the frontend builds cleanly:

```bash
# Run API smoke and integrity tests
npm test

# Test frontend production build
npm --prefix client run build
```

---

## Pull Request Workflow

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your modifications, adhering to existing coding patterns.
3. Commit with concise, descriptive commit messages:
   ```bash
   git commit -m "feat: add nutrient calculation breakdown"
   ```
4. Push your branch to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request against the `main` branch with a clear description of the problem solved and changes made.

---

## License

By contributing to MISE, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
