# common-utils 项目说明文档

## 1. 项目定位

`common-utils` 是一个使用 TypeScript 编写的通用工具函数库模板，目标是：

- 快速开发和维护工具函数（字符串、数字等）
- 产出可直接发布到 npm 的标准包
- 提供完整的工程化能力（构建、测试、Lint、格式化、提交校验）

---

## 2. 当前已包含的功能

### 2.1 工具函数能力

当前内置了 2 类工具函数，并统一从入口导出：

- 字符串工具（`src/string.ts`）
  - `toKebabCase(input: string)`：将驼峰/空格/下划线形式转为 kebab-case
  - `capitalize(input: string)`：首字母大写
- 数字工具（`src/number.ts`）
  - `clamp(value, min, max)`：将值限制在区间内
  - `inRange(value, min, max)`：判断值是否处于闭区间 `[min, max]`

入口文件 `src/index.ts` 通过 `export *` 聚合导出，调用方可以直接从包根路径使用。

### 2.2 构建与产物能力

已支持一套 npm 友好的多格式构建：

- ESM：`dist/index.js`
- CJS：`dist/index.cjs`
- 类型声明：`dist/index.d.ts`
- Source Map：便于调试

并通过 `package.json` 中的 `exports / main / module / types` 字段明确声明入口，兼容常见 Node.js / 构建工具。

### 2.3 测试能力（Vitest）

已配置 Vitest 与覆盖率输出：

- 测试文件规则：`src/**/*.test.ts`
- 已有测试样例：
  - `src/string.test.ts`
  - `src/number.test.ts`
- 覆盖率配置：V8 provider + text/html 报告（输出到 `coverage`）

### 2.4 代码规范能力（ESLint + Prettier）

- ESLint：
  - 基于 `eslint:recommended`
  - TypeScript 规则：`plugin:@typescript-eslint/recommended`
  - 与 Prettier 冲突规避：`eslint-config-prettier`
- Prettier：
  - `singleQuote: true`
  - `semi: true`
  - `trailingComma: all`
  - `printWidth: 100`

### 2.5 Git 提交质量门禁（Lefthook）

已启用 Git Hook 自动校验：

- `pre-commit`：执行 `pnpm lint` + `pnpm test`
- `commit-msg`：执行 commitlint，校验 Conventional Commits

这可以在提交阶段提前阻断不合规代码和提交信息。

### 2.6 npm 发布能力

- `prepublishOnly` 脚本会在发布前自动构建
- `publishConfig.access = public` 便于发布公开包
- `files` 仅包含 `dist`，避免发布源码和无关文件

---

## 3. 如何实现（工程方案说明）

### 3.1 包管理与运行环境

- 包管理器：`pnpm`
- Node 版本要求：`>=18`
- 模块类型：`type: module`

### 3.2 TypeScript 方案

`tsconfig.json` 的关键实现点：

- `strict: true`：启用严格类型检查
- `moduleResolution: Bundler`：更适配现代打包器
- `noEmit: true`：类型检查与构建分离（由 tsup 负责产物）
- `declaration/declarationMap/sourceMap`：保证类型与调试能力

### 3.3 构建方案（tsup）

使用脚本：

```bash
pnpm build
```

等价命令：

```bash
tsup src/index.ts --format esm,cjs --dts --sourcemap --clean
```

实现效果：

- 单入口打包
- 同时输出 ESM/CJS
- 自动生成 `.d.ts`
- 构建前清理旧产物

### 3.4 测试方案（Vitest）

核心实现文件：`vitest.config.ts`

- 指定测试匹配路径
- 启用覆盖率并生成可阅读报告

常用命令：

```bash
pnpm test
pnpm test:watch
pnpm test:coverage
```

### 3.5 规范方案（Lint/Format）

常用命令：

```bash
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:check
```

职责划分：

- ESLint：代码质量与潜在问题
- Prettier：统一格式风格

### 3.6 提交规范方案（Lefthook + commitlint）

核心文件：

- `lefthook.yml`：定义 `pre-commit` 与 `commit-msg`
- `commitlint.config.cjs`：采用 `@commitlint/config-conventional`

安装与同步：

```bash
pnpm hooks:install
```

提交信息示例：

```text
feat: add string helpers
fix: correct clamp boundary behavior
chore: upgrade vitest and eslint config
```

---

## 4. 目录结构（当前）

```text
common-utils/
├─ src/
│  ├─ index.ts
│  ├─ string.ts
│  ├─ number.ts
│  ├─ string.test.ts
│  └─ number.test.ts
├─ package.json
├─ tsconfig.json
├─ vitest.config.ts
├─ .eslintrc.cjs
├─ .prettierrc.json
├─ .prettierignore
├─ lefthook.yml
├─ commitlint.config.cjs
├─ README.md
└─ PROJECT_OVERVIEW.md
```

---

## 5. 常用工作流

### 本地开发

```bash
pnpm install
pnpm dev
```

### 质量检查

```bash
pnpm lint
pnpm test
pnpm format:check
```

### 构建与发布

```bash
pnpm build
npm login
pnpm publish --access public
```

---

## 6. 后续可扩展建议

- 增加更多工具模块（日期、数组、对象、校验）
- 增加 CI（GitHub Actions）在 PR 上执行 lint/test/build
- 增加变更日志方案（Changesets）与自动版本发布流程
- 在 `exports` 中扩展子路径导出（按模块按需引入）

---

## 7. 一句话总结

该项目已经具备“可开发、可测试、可规范、可提交校验、可发布”的完整 npm 工具库工程基础，可直接作为团队公共工具库模板使用。
