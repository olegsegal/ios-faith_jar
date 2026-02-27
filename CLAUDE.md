# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Faith Jar** is an iOS app project currently in the **pre-development/planning phase**. No source code exists yet. The repository uses the BMad Method v6 for structured AI-assisted project planning and development.

## User Context

- **User**: Oleg
- **Communication language**: Russian (communicate with Oleg in Russian)
- **Document output language**: English (all generated artifacts should be in English)
- **Skill level**: Intermediate

## BMad Method (BMAD) v6

This project uses the BMad Method — a structured framework for AI-assisted software development with role-based agents and step-by-step workflows.

### Installed Modules

| Module | Purpose |
|--------|---------|
| **core** (v6.0.3) | Base BMAD functionality — brainstorming, party mode, editorial review, help |
| **bmm** (v6.0.3) | Main methodology — analysis, planning, architecture, implementation workflows |
| **bmb** (v0.1.6) | Builder module — create/edit/validate agents, modules, and workflows |
| **cis** (v0.1.8) | Creative Intelligence Suite — design thinking, innovation, storytelling |
| **tea** (v1.3.1) | Test Architecture Enterprise — test design, automation, CI, ATDD |

### Key Directory Structure

- `_bmad/` — BMAD framework files (agents, workflows, templates). **Do not modify.**
- `_bmad-output/` — Generated artifacts output directory
  - `planning-artifacts/` — PRDs, product briefs, architecture docs, epics/stories
  - `implementation-artifacts/` — Stories, sprint plans, code review outputs
  - `test-artifacts/` — Test plans and QA outputs
  - `bmb-creations/` — Custom agents/modules/workflows built with BMB
- `docs/` — Project knowledge base (referenced by BMAD as `project_knowledge`)
- `.cursor/commands/` — Cursor IDE command files for invoking BMAD workflows

### BMAD Workflow Progression

The BMad Method follows this pipeline for taking a project from idea to implementation:

1. **Analysis** (`_bmad/bmm/workflows/1-analysis/`) — Product brief, domain/market/technical research
2. **Planning** (`_bmad/bmm/workflows/2-plan-workflows/`) — PRD, UX design
3. **Solutioning** (`_bmad/bmm/workflows/3-solutioning/`) — Architecture, epics & stories, implementation readiness check
4. **Implementation** (`_bmad/bmm/workflows/4-implementation/`) — Story creation, dev story execution, code review, sprint management
5. **Quick Flow** (`_bmad/bmm/workflows/bmad-quick-flow/`) — Rapid spec + dev for small changes

### Running BMAD Workflows

BMAD workflows are invoked through Cursor commands (`.cursor/commands/bmad-*.md`). Each command points to a workflow file in `_bmad/`. To run a workflow in Claude Code, read the corresponding workflow file and follow its instructions. Key entry points:

- **Start planning**: Read `_bmad/bmm/workflows/1-analysis/create-product-brief/workflow.md`
- **Quick dev**: Read `_bmad/bmm/workflows/bmad-quick-flow/quick-dev/workflow.md`
- **Get help**: Read `_bmad/core/tasks/help.md`

### Output Convention

All BMAD-generated documents go to `_bmad-output/` subdirectories, not to `docs/` or the project root.
