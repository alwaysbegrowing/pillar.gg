Remyx

This project is initialized with [Ant Design Pro](https://pro.ant.design) and [Vercel](https://vercel.com). Follow is the quick guide for how to use.

## Environment Prepare

Install `node_modules`:

```bash
npm install
```

Install Vercel CLI for running

```bash
npm i -g vercel
```

Recieve environment variables from Vercel

```bash
vercel env pull
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script.

## Start project

Run vercel on port 8000 to comply with twitch authentication route.

This runs the API and the React project.

```bash
vercel dev --listen 8000
```
