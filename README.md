# rubin_workflows

Workflows for GitHub Actions.

## Rebase Checker / Commitlint
This workflow performs [commitlint](https://commitlint.js.org) and dependencyc check actions on the commits in a branch or pull request.

By default, a custom `rebase-checker` rule is used to assert that no merge commits of the `main` (or `master`) branch have been made, encouraging the use of `rebase` instead.

This workflow also supports additional optional hygiene checks:

- Commits are linted against [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) rules or a custom rules file provided by the caller.
- Commits are checked for the message "DO NOT MERGE"
- `dependency-checker`, a separate workflow job that checks a Python project's dependencies for references to ticket branches. This job will be skipped for non-Python projects.

This workflow includes a capstone job called "rebase_checker" that can be used with Github repository "Require status checks to pass" rule.

### Usage
You may use this workflow in your own projects by adding a job to a new or existing workflow:

```
jobs:
  rebase_checker:
    uses: lsst/rubin_workflows/.github/workflows/rebase_checker.yaml@main
    with:
      rebase-checker: true
      lint-commits: true
      dependency-checker: true
```

### Configuration Inputs

| Input | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `rebase-checker` | boolean | false | `true` | Check for merge commits of main or master into this branch, encouraging rebase behavior instead. |
| `lint-commits` | boolean | false | `false` | Lint commit messages in current branch or PR according to conventional-commit or custom rules (see `custom-rules` input). |
| `dependency-checker` | boolean | false | `false` | Check for requirements that refer to ticket branches |
| `do-not-merge-checker` | boolean | false | `false` | Check for commit messages that start with `DO NOT MERGE` |
| `custom-rules` | string | false | `@commitlint/config-conventional` | Custom rules module to use with lint-commits (relative path to file in calling repository, e.g., `.github/config.ts`) |
| `verbose` | boolean | false | `false` | Whether to run `commitlint` commands with the `--verbose` flag. |
| `workflow-repo` | string | false | `lsst/rubin_workflows` | The name of the workflow repository (i.e., the repository hosting this workflow and its tooling). |
| `workflow-ref` | string | false | `main` | The branch name in the workflow repository from which the tooling should be used. |
