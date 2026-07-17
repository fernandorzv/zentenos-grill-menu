# Branch Protection Checklist (main)

Use this checklist when configuring repository protection for production safety.

- Require a pull request before merging to `main`
- Require at least 1 approving review
- Dismiss stale approvals when new commits are pushed
- Require status checks to pass before merging
- Required checks:
  - `validate-and-build`
- Require branches to be up to date before merging
- Restrict direct pushes to `main`
- Restrict force pushes
- Restrict branch deletion
- Enable conversation resolution before merge

## Release Traceability Rules

- Every menu update must modify `menuVersion` and `updatedAt` in `public/menu-public.json`
- Keep `menuVersion` aligned with legacy `version`
- Keep `updatedAt` aligned with legacy `lastUpdated`
- Merge only when CI is green and metadata is valid
