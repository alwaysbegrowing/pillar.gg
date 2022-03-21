# Pillar
 
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

4. Download the environment variables

   ```sh
   vercel env pull
   ```

## Start project

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
  
  ---

<center>
<a href="https://vercel.com?utm_source=alwaysbegrowing&utm_campaign=oss"><img src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg"/></a>
</center>

