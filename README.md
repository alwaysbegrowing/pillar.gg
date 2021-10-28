# Pillar.gg

This project is initialized with [Ant Design Pro](https://pro.ant.design) and [Vercel](https://vercel.com).

## Environment Setup

You should have `node` 16 installed: `brew install node@16` or use a node version manager.

1. Install `yarn` and `vercel`

   ```sh
   npm i -g yarn vercel
   ```

2. Install dependencies

   ```sh
   yarn --immutable
   ```

3. Link vercel project (must have vercel project connected to repo)

   ```sh
   vercel link
   ```

4. Add a file `.env` for env vars.

   ```sh
   > .env

   # if you are part of the main vercel project
   vercel env pull
   ```

## Start project

```sh
vercel dev -l 8000
```
