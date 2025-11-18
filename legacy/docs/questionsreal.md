# 0) Monorepo fundamentals (30–60 min)

1. In the `pnpm-workspace.yaml` file the content is a list of packages with `apps/*` and `packages/*`, does that mean that the packages between each of these folders are shared between each package inside of them, of does that mean that all packages from these folders are shared across folders?

2. The root `package.json` seems really confusing for me, the following is the content of this file:

```json
{
  "name": "tsturborepo",
  "version": "0.0.1",
  "private": false,
  "scripts": {
    "build": "turbo build",
    "dev": "turbo dev",
    "lint": "turbo lint",
    "format": "prettier --write \"**/*.{ts,tsx,md}\""
  },
  "devDependencies": {
    "@workspace/eslint-config": "workspace:*",
    "@workspace/typescript-config": "workspace:*",
    "prettier": "^3.2.5",
    "turbo": "^2.3.0",
    "typescript": "5.5.4"
  },
  "packageManager": "pnpm@9.12.3",
  "engines": {
    "node": ">=20"
  }
}
```

- In the devDependencies there's two dependencies that start with `@workspace` what does that mean? what does this do? I understand that the `package.json` file defines the packages that project requires and the scripts it uses, however this one is requiring something that is already present locally, so why is it here? and why doesn't it need a more specific path like `@workspace/packages/eslint-config`? And I don't even know if this package being imported is the one present in the package directory locally.

3. The `turbo.json` file has a lot of tags and a structure I've never seen before, here's the file:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "ui": "tui",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULT$", ".env*"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "check-types": {
      "dependsOn": ["^check-types"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

- So most of these tags seem unfamiliar to me, first of all I was taught about defining the tasks using the `pipeline` tag, so one of the first questions regarding this is whether the `pipeline` tag is incorrect or if is this another way of setting it up. Now the rest like `ui` and `$schema` are unfamiliar to me.

4. Now, what about the `pnpm-lock.yaml` file? Is this generate automatically?

5. What about the files inside the `packages/` folder? What is the purpose of the folders inside of it? And why should we have the UI folder in the package folder instead of a component folder inside of `apps/web`?

6. Does the packages get linked using the `pnpm-workspace.yaml` file? Because as you said running `pnpm install` at the root of the project would install the dependencies of every package right?

# 1) Shared packages tour (45–75 min)

1. What would importing an UI component look like with the package setup like this?

# 2) Next.js (apps/web) structure (60–90 min)

1. I still don't know why some folders have names with parentheses (like `(auth)`).

# 3) NestJS (apps/api) structure (60–120 min)

1. To be honest, I've never used NestJS, so most of the file structure is still unfamiliar to me. I don't understand the concept that the file structure follows, like what are controllers, modules, service, what does it mean for a file to have `*.spec.ts`, `*.d.js` or `*.d.ts`.

2. So since I'm not used to NestJS it would be nice for you to give me a quick resource to learn the fundamentals so I can undertand things like the file structure or what does things like `@Injectable()` mean.

3. The `auth/` directory seems completely confusing to me, I can't understand a thing, all of those files seem confusing to me.

4. Since I have no experience at all with NestJS, the `dto/` directory also didn't make sense to me. This is only a way to declare the response structure for swagger?

5. I don't understand at all what does the `*.entity.ts` files do.

6. TF is tenant?

# 5) Config & environment (30–60 min)

1. TF does `transpilePackages: ["@workspace/ui"]` mean (`nex.config.mjs` and also what's `mjs`?)?

2. What is `postcss.config.mjs`?

3. The file `nest-cli.json` doesn't make much sense to me. Here's it' content:

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true
  }
}
```

# 9) Linting, formatting, types (20–40 min)

1. To be honest I don't even know what does things really means in this scenario.

# Overall questions

1. What is the purpose of the folder `coverage`?

Overall I think I feel like I don't have enough knowledge or experience to develop on top of this, If I had to add other routes, pages, or components I don't feel capable of doing that yet, do you think I should just go for it, and learn in the process, or should I study before getting into the code. If you think I should study, what would be a good content for this? Is there any book, online course or videos for learning full-stack development like this? If I have to study I would like to rush things a bit since It's been a while since I don't make any projects and I have been wanting to make something like this for a while.
