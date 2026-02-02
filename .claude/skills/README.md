# GasLens Custom Skills

This directory contains custom Claude Code skills for GasLens development workflows.

## Available Skills

### 1. `/gas-check`
**Purpose**: Validate gas price functionality
**When to use**: After modifying gas display logic, API integration, or status calculations
**Checks**:
- API accessibility
- Price validation
- Status calculation
- Dark mode styling

### 2. `/techdebt`
**Purpose**: Find technical debt and code quality issues
**When to use**: End of every session, before major releases
**Finds**:
- Duplicated code
- Missing dark mode
- Hard-coded values
- TODOs
- Missing error handling
- Performance issues
- Accessibility problems

### 3. `/darkmode-check`
**Purpose**: Comprehensive dark mode validation
**When to use**: After UI changes, before deployment
**Validates**:
- All color classes have dark variants
- Contrast ratios
- Toggle functionality
- CSS variables
- LocalStorage persistence

### 4. `/deploy-check`
**Purpose**: Pre-deployment validation
**When to use**: Before pushing to main, before Vercel deployment
**Checks**:
- Build success
- Functional tests
- Responsive design
- Dark mode
- Performance
- Security
- SEO
- Git status

## Usage

```bash
# In Claude Code, invoke skills with slash commands
/gas-check
/techdebt
/darkmode-check
/deploy-check
```

## Creating New Skills

1. Create a new `.txt` file in this directory
2. Follow the format:
   ```
   name: skill-name
   description: What this skill does

   [Detailed instructions for Claude]
   ```
3. Test the skill
4. Document it here

## Skill Development Guidelines

- **Be specific**: Provide exact file paths, line numbers, and code patterns
- **Be actionable**: Output should be clear tasks, not vague suggestions
- **Be consistent**: Use the same output format across similar skills
- **Be efficient**: Don't repeat work unnecessarily

## Future Skills Ideas

- `/test-runner`: Run all tests and report failures
- `/bundle-analyzer`: Analyze bundle size and suggest optimizations
- `/security-audit`: Scan for security vulnerabilities
- `/api-tester`: Test all API endpoints
- `/lighthouse`: Run Lighthouse audit
- `/a11y-check`: Comprehensive accessibility audit

---

*Update this README when adding new skills*
