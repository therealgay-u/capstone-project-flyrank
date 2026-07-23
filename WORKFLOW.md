# AI Workflow Comparison

## Feature

Implemented a React Settings page for an AI-powered Intrusion Detection System with:

- Detection Threshold
- Alert Email
- Enable Automatic Blocking
- Save button with form validation

---

## Round 1 – Vague Prompt

**Prompt:**

```text
Create a React settings form with validation.
```

### Results

- Generated a more polished and detailed UI.
- Created a multi-tab settings page.
- Added settings and options that were not mentioned in the prompt.
- Made assumptions about the application and hallucinated extra features.
- Required manual review to remove unnecessary parts.

---

## Round 2 – Detailed Prompt

### Results

- Generated a concise single-page settings form.
- Used React functional components, `react-hook-form`, and Zod validation.
- Included only the requested fields and validation.
- Added labels, `aria-invalid`, tests, and validation checks.
- Did not add extra features or make assumptions.

---

## Comparison

| Vague Prompt | Detailed Prompt |
|--------------|-----------------|
| More polished UI | Simpler UI |
| Multi-tab layout | Single-page layout |
| Added extra settings | Only included requested features |
| Hallucinated features | No unnecessary additions |
| More manual review required | Easier to verify and review |

---

## Takeaway

- Detailed prompts produce more predictable results.
- Clear requirements reduce hallucinations.
- Spending more time writing the prompt reduces time spent reviewing the generated code.