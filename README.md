# rubin_workflows

Workflows for GitHub Actions.

## Rebase Checker / Commitlint
This workflow performs a [commitlint](https://commitlint.js.org) action on the commits in a branch or pull request.

By default, [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) rules are used with `commitlint`, although the caller can provide their own rules file.

This workflow also supports additional optional hygiene checks:

- `rebase-checker`, which uses a custom rules file to assert that no merge commits of the `main` (or `master`) branch have been made, encouraging the use of `rebase` instead. This check is enabled by default.
- `do-not-merge`, which ...

### Usage
You may use this workflow in your own projects by adding a job to a new or existing workflow:

```
jobs:
  rebase_checker:
    uses: lsst/rubin_workflows/.github/workflows/rebase_checker.yaml@main
    with:
      rebase-checker: true
      lint-commits: true
```

This workflow includes a capstone job named "rebase_checker" which can be used as a "Required status check" in a branch protection ruleset.

### Configuration Inputs

| Input | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `lint-commits` | boolean | false | `false` | Lint commit messages in current branch or PR according to conventional-commit or custom rules (see `custom-rules` input). |
| `rebase-checker` | boolean | true | `true` | Check for merge commits of main or master into this branch, encouraging rebase behavior instead. |
| `do-not-merge-checker` | boolean | true | `true` | Check for commit messages that start with `DO NOT MERGE` |
| `dependency-checker` | boolean | true | `true` | Check for requirements that refer to ticket branches |
| `custom-rules` | string | false | `@commitlint/config-conventional` | Custom rules module to use with lint-commits (relative path to file in calling repository, e.g., `.github/config.ts`) |
| `verbose` | boolean | false | `false` | Whether to run `commitlint` commands with the `--verbose` flag. |
| `workflow-repo` | string | false | `lsst/rubin_workflows` | The name of the workflow repository (i.e., the repository hosting this workflow and its tooling). |
| `workflow-ref` | string | false | `main` | The branch name in the workflow repository from which the tooling should be used. |
