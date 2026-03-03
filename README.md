# common-utils

一个使用 TypeScript 编写、通过 `pnpm` 管理、可发布到 npm 的通用工具库模板。

## 快速开始

```bash
pnpm install
pnpm build
```

## 打包说明

```json
// --format esm,cjs：同时输出 ES Module (esm) 和 CommonJS (cjs) 格式的代码。
// --dts：生成 TypeScript 声明文件（.d.ts）。
// --sourcemap：生成 Source Map 文件（便于调试）。
// --clean：构建前清理输出目录。
"build": "tsup src/index.ts --format esm,cjs --dts --sourcemap --clean"

// 在执行 pnpm publish 前自动运行 build 脚本，确保发布的包是最新构建的
"prepublishOnly": "pnpm run build"

// 在安装依赖后（如 pnpm install）自动安装 Lefthook Git Hooks。
"prepare": "lefthook install"

// commitlint 检查 Git 提交信息是否符合规范 检查最近一次提交信息（通常用于 commit-msg 钩子）
"commitlint": "commitlint --edit"

```

## 本地开发

```bash
pnpm dev
```

## 单元测试

```bash
pnpm test
pnpm test:watch
pnpm test:coverage
```

## 代码规范

```bash
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:check
```

## Git 提交前检查（Lefthook）

安装依赖后会自动执行 `lefthook install`（通过 `prepare` 脚本）。

```bash
pnpm hooks:install
```

当前已配置 `pre-commit`：提交前自动运行 `pnpm lint` 和 `pnpm test`。

同时已配置 `commit-msg`：提交信息会按 Conventional Commits 规范校验。

推荐模板：

```text
<type>(<scope>): <subject>
```

常用 type：

- `feat`：新功能
- `fix`：缺陷修复
- `chore`：构建、依赖、脚手架等杂项变更

示例：

```text
feat: add string helpers
fix: correct clamp boundary behavior
chore: upgrade vitest and eslint config
```

## 发布到 npm

1. 修改 `package.json` 中的 `name`（例如 `@your-scope/common-utils`）
2. 登录 npm：

```bash
npm login
```

3. 发布：

```bash
pnpm publish --access public
```

> 已配置 `prepublishOnly`，发布前会自动执行构建。
