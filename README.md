# tree-sitter-todo

A [Tree-sitter](https://tree-sitter.github.io/tree-sitter/) grammar for Todo/PlainTasks files.

This grammar is used by the [PlainTasks Zed extension](https://github.com/cseelus/plaintasks-zed) to provide syntax highlighting for `.todo` files.

## Supported Syntax

```
Project Name:
  ☐ Pending task @tag
  ✔ Completed task @done(25-01-18 14:30)
  ✘ Cancelled task @cancelled(25-01-18 10:00)

  This is a comment line.

Archive:
  ✔ Archived task @done(25-01-17 09:00)
```

### Elements

- **Projects**: Lines ending with `:`
- **Tasks**: Lines starting with `☐` (pending), `✔` (done), or `✘` (cancelled)
- **Tags**: `@tagname` or `@tagname(value)`
- **Comments**: Lines without task symbols or project colons

## Installation

This grammar is primarily intended for use with the Zed editor via the PlainTasks extension.

### For Development

```bash
npm install
npx tree-sitter generate
npx tree-sitter test
```

## License

MIT
