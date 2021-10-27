# Pillar.gg

This project is initialized with [Ant Design Pro](https://pro.ant.design) and [Vercel](https://vercel.com).

## Environment Setup

1. Install `yarn` and `vercel

   ```sh
   npm i -g yarn vercel
   ```

2. Install dependencies

   ```sh
   yarn install
   ```

3. Link vercel project (must have vercel project connected to repo)

   ```sh
   vercel link
   ```

4. Add a file `.env` for env vars.

   ```sh
   > .env

   # if you are part of the main vercel project
   yarn dlx vercel env pull
   ```

5. Swap comments in `api/twitch/_getUserTwitchCredentials.js` - lines 9 and 10

   ```js
   // ...
   /* 9  */    `redirect_uri=http://localhost:8000/TwitchAuth&`+
   /* 10 */    // `redirect_uri=https://app.pillar.gg/TwitchAuth&` +
   // ...
   ```

## Start project

```sh
vercel dev -l 8000
```
