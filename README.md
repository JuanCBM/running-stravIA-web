# RunningStravIAWeb

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.9.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## GitHub Pages Deployment

This project is configured for easy deployment to GitHub Pages.

### Automated Deployment

The project includes a GitHub Actions workflow that automatically deploys the application to GitHub Pages whenever changes are pushed to the main branch. The workflow:

1. Builds the application with the correct base href for GitHub Pages
2. Deploys the built application to the gh-pages branch
3. Makes the application available at `https://[username].github.io/running-stravIA-web/`

To use this automated deployment:

1. Push your changes to the main branch
2. GitHub Actions will automatically build and deploy the application
3. Wait a few minutes for the deployment to complete
4. Access your application at `https://[username].github.io/running-stravIA-web/`

### Manual Deployment

If you prefer to deploy manually, you can use the following commands:

```bash
# Build the application for GitHub Pages
npm run build:gh-pages

# Deploy to GitHub Pages
npm run deploy:gh-pages
```

This will build the application with the correct base href and deploy it to the gh-pages branch.

### Configuration

The GitHub Pages deployment is configured with:

- Base href: `/running-stravIA-web/` (configured in the build:gh-pages script)
- Output directory: `dist/running-strav-ia-web/browser`
- Target branch: `gh-pages`
- `.nojekyll` file: Prevents GitHub Pages from processing the site with Jekyll, which can interfere with Angular applications

If you need to modify these settings, you can update:

- The base href in the `build:gh-pages` script in package.json
- The deployment directory in the `deploy:gh-pages` script in package.json
- The GitHub Actions workflow in `.github/workflows/github-pages.yml`

The `.nojekyll` file is automatically added to the build output during both manual and automated deployments.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
