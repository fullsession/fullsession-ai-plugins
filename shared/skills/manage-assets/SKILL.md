---
name: fullsession-manage-assets
description: How to safely create, edit and delete FullSession segments, funnels, saved heatmaps, dashboards and charts. Use when the user asks to create, rename, change, organize or delete any of these.
---

# Creating and changing things in FullSession

These tools change the user's account. Be precise, confirm before acting, and change only what was asked.

## Before any change

- Confirm the exact target by name (and site) with the user, especially when names are similar ("yanal" vs "yanall").
- Say what will happen in one sentence before calling the tool.

## Segments and funnels: draft, confirm, save

1. Draft the definition with the AI drafting tools, never by hand:
   - Segments: `generate_segment_from_prompt` → filters
   - Funnels: `generate_funnel_steps_from_prompt` → steps
2. Show the user the drafted audience or step list and confirm the order and conditions.
3. Save with `create_segment` / `create_funnel`, passing the drafted definition unchanged.

A funnel is not a segment: don't create a segment when the user asks for a funnel.

A new funnel processes its data for a few minutes; tell the user results will appear shortly.

## Editing: change only what was asked

`update_funnel` and `update_segment` change only the fields you pass. Everything else keeps its current value.

- **Rename:** pass only the id and the new name/title. Never resend or regenerate steps or filters just to rename; that can silently change what the funnel or segment measures.
- **Change steps or filters:** draft the new definition with the drafting tool, confirm it, then pass it. This replaces the whole definition, and a funnel reprocesses its data.
- A funnel can't be edited while it is processing.

## Dashboards and charts

- Preview a chart's numbers first with the matching read tool (`get_metric`, `get_trend`, `get_breakdown`, `get_page_ranking`, `get_feedback_snapshot`, `get_page_flow`), then save it with `create_card`.
- `create_dashboard` can create a dashboard with several charts at once (max 15). Leave layout out so charts place themselves.
- Measure names are exact (`totalSessions`, not `sessions`).
- Don't put the time range in chart titles; the dashboard controls the range.
- `add_card_to_dashboard` / `remove_card_from_dashboard` only move charts; the chart itself stays in the library.

## Deleting

- Deletes are permanent. Confirm by name immediately before deleting, every time.
- Mention what depends on it: deleting a segment affects dashboards, alerts and Lift AI goals built on it.
- Prefer removing a chart from a dashboard over deleting the chart.

## After a change

Report exactly what changed (the tools return the changed fields) and where to see it in FullSession.
