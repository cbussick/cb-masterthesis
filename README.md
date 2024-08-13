# DiNAs Lab

![DiNAs Lab Logo](public/logo/dinaslab-logo-simple.svg)

DiNAs lab is a platform for teaching school students about biology. This project is part of the curriculum of my master's degree.

## Quickstart

1. Clone the repository and install dependencies

```bash
git clone git@github.com:cbussick/cb-masterthesis.git
cd cb-masterthesis
npm install
```

2. Create a `.env.local` file and add the app secrets. (Ask one of the maintainers)
3. Run the app

```bash
npm run dev
```

## Available Scripts

### Run the Project

```bash
npm run dev
```

Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Check the Project for Errors

```bash
npm run full-check
```

Checks the project for TypeScript errors, formats the code using Prettier and lints the project.

You can also use the individual scripts:

```bash
npm run typecheck
npm run prettify
npm run lint
```

## Firebase Cloud Functions

### Setup

1. Navigate into the `cloud-functions/functions` folder.
2. Run `firebase login` if you are not yet logged in.
3. Run `firebase init firestore`. This will create the `firestore.rules` file locally.

## Git Hooks

This project uses [husky](https://github.com/typicode/husky) to run git hooks. Currently, there is only one hook that runs `npm run full-check` before every push to the repository.

## Deployment

The project is deployed using [Vercel](https://vercel.com/).
