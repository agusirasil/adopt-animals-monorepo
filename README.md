# adopt-animals-monorepo

Monorepo with Adopt Animals CMS and API workspaces

## Install Dependencies

```
yarn
```

## Run It

Check `package.json` for all commands. 

#### Run in *development* mode:

Run on separate terminals
```shell
yarn api:dev
```
And 
```shell
yarn cms:dev
```

#### Run in *production* mode:

Compiles the application and starts it in production production mode.

Run on separate terminals
```shell
yarn api:build
yarn api:start
```
And
```shell
yarn cms:build
yarn cms:start
```

## Try It
CMS on [http://localhost:3000](http://localhost:3000)

API on [http://localhost:8000](http://localhost:8000)
Play with Swagger on [http://localhost:8000](http://localhost:8000/api-explorer/)

