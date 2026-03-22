# Are Two-High Safeties Ruining the NFL?

An interactive data visualization article analyzing whether the rise of two-high safety defenses is actually responsible for the decline in explosive passing plays in the NFL. Using defensive coverage data from every NFL play over a decade (2015–2024), the article argues that the real shift is not an increase in two-high coverages, but an increase in disguised coverages through post-snap safety rotations. Built with D3.js and JavaScript on ObservableHQ.

## Argument

The common narrative claims that defensive coordinators are running more two-high safety shells (Cover 2, Cover 4), which limit deep passing opportunities by placing two defenders over the top. The data tells a different story.

## Visualizations

**Coverage scheme diagrams.** Side-by-side SVG field diagrams comparing one-high and two-high safety alignments, with positioned players (WR, CB, S), zone shading, and vertical route arrows to illustrate the structural advantage of each shell.

**Pre-snap alignment trend chart.** Interactive line chart tracking the year-over-year percentage of one-high vs two-high pre-snap safety looks from 2015 to 2024, with hover tooltips showing exact percentages and play counts per season.

**Safety rotation animation.** Two field diagrams with a shared slider that animates safety positions from pre-snap to post-snap, demonstrating both rotation types: two-high disguising into one-high (Cover 3) and one-high disguising into two-high (Cover 2). Uses eased interpolation on the slider for smooth transitions.

**Sankey flow diagram.** Interactive flow chart mapping pre-snap alignment (1-High, 2-High) to actual post-snap coverage (Cover 0 through Cover 6, Bracket, Other), with a year slider spanning 2015–2024. Hovering over flows shows play counts, percentages of source and target nodes, and total snap share. Node sorting is fixed to maintain consistent visual ordering of coverages across years.

**Post-snap coverage pie chart.** Year-selectable pie chart breaking down actual coverage distribution into one-high, two-high, and other categories, with a side panel showing aggregate percentages. Demonstrates that the post-snap one-high vs two-high balance has remained largely stable despite the pre-snap shift.

**Play outcome simulator.** An interactive game where the user selects an offensive formation and route concept, sees a randomly generated pre-snap safety alignment, then predicts the actual post-snap coverage before snapping the ball. The actual coverage is determined probabilistically based on the Sankey flow data for the selected year (2015 or 2024). Tracks prediction accuracy across plays, illustrating how much harder coverage prediction has become in the modern NFL due to increased disguise rates.

## Data

NFL defensive coverage data (2015–2024) stored as a CSV with per-year columns for total defensive snaps, pre-snap alignment counts, and post-snap coverage breakdowns by pre-snap origin (e.g., `cover_3_from_1_high`, `cover_3_from_2_high`).

## Tech Stack

- D3.js (v7) with d3-sankey
- JavaScript (ObservableHQ notebook)
- HTML/CSS (custom article page with responsive formatting and print stylesheet)
- Hosted on portfolio site via Observable Runtime embed