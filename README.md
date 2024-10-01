# Rascal Deliveries Test App

## Run:

In a new terminal, open the monorepo folder to run the mock API

```
cd monorepo
npm install
npm run start
```

And in another, open the expo folder and run iOS:

```
cd rascal-deliveries
npm install
npm run ios
```

You can also run the web version:

```
npm run web
```

Caveat: Android does not like non-SSL connections and I couldn't get expo to comply! I spent some extra time also trying to get expo to work with turborepo with no luck (too much reliability on file paths - I blame expo).
