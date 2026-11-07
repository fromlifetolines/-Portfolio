# GitHub Pages delivery trim · 2026-11-07

Previous publish job #148 failed while syncing files, with a Pages artifact of 873,647,393 bytes (833 MiB). The previous successful job had an even larger artifact (878,197,632 bytes), so artifact size alone does not prove the root cause.

The tracked repository contained approximately 285 MiB of review and presentation evidence directories. The site's 113 text files (public HTML, JS, CSS, JSON, MD) were checked for `/presentation/` and `/review/` references; none were found. These paths are excluded from the **published Jekyll site**, but remain tracked in the repository. 

No changes to case13 PLAYFORM, original approved case14 SHOT01/08/14, case14 JS, or site graphics. The optimization affects output publication scope only.

Check post-build artifact size, workflow deployment state, and the live CDN content after deploy. 
