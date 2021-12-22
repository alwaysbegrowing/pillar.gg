# Pillar.gg

This project is initialized with [Ant Design Pro](https://pro.ant.design) and [Vercel](https://vercel.com).

## Setup

You should have `node` 16 installed: `brew install node@16` or use a node version manager.

1. Install `yarn` and `vercel` globally

   ```sh
   npm i -g yarn vercel
   ```

2. Install dependencies

   ```sh
   yarn install
   ```

3. Link vercel project (must have vercel project connected to repo for serverless functions)

   ```sh
   vercel link
   ```

4. Add a file `.env` for env vars

   ```sh
   > .env

   # if you are part of the main vercel project
   vercel env pull
   ```

## Development server

```sh
vercel dev -l 8000
```

## Troubleshooting

- Clean `yarn` local or global cache

  ```sh
  yarn cache clean
  yarn cache clean --mirror
  ```

- Clean `umi` build artifacts

  ```sh
  rm -r src/.umi*
  ```

- Rebuild dependencies

  ```sh
  yarn rebuild
  ```
