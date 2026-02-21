---
title: "Six Months of Lessons"
description: "What a three-week mobile app redesign taught me about scope, capacity, and craft."
date: "Jan 18, 2026"
tags: ["project-management", "lessons-learned", "development"]
---

Over the past six months, we worked on a large project: redesigning our mobile application.

The original estimate was two to three weeks. It took six months. Throughout this article, I'll walk through the problems we faced, the lessons we learned, and a few other thoughts.

Before getting into the content, some context. This project ran from mid-August to mid-January. We're a small startup with two engineers: one junior (myself) and one senior. We're not working on the product 24/7, and we also handle the technical side of onboarding new clients and the support load that comes from missing features in the current product.

Having said that, here are my thoughts.

## Difficulties

Our biggest problem early on was not knowing the shortcuts that existed. A clear example was our initial theme implementation: we built it entirely from scratch, made mistakes, fixed them, then fixed them again. Tools exist that configure a Flutter theme's colors, typography, spacing, and sizing without doing it by hand. Not knowing this cost us real time.

Worth noting: building it ourselves gave us a complete understanding of the system. If we ever need to change anything, we know exactly where to look.

A harder challenge was accurately accounting for team capacity. Two developers means any shift of focus, any day lost to something outside the redesign, cuts output in half. Assessing true capacity is difficult in any team. It is even harder when the same team also owns other parts of the business.

The hardest challenge was the true size of the project. At the start, two to three weeks seemed reasonable. As we progressed, scope expanded. The redesign was built around a product vision that did not yet fully exist, which meant creating new flows, new user experiences, and new features on top of the visual work. Defining scope at the beginning was impossible because the target kept moving.

## Lessons Learned

The clearest lesson was that good scope definition requires three things: a precise expected output, an honest assessment of team capacity, and room for setbacks. Leaving no buffer is not estimating; it is wishful thinking. On any project that runs for months, setbacks will happen.

In our case, the team was running two other projects in parallel during the redesign. Those projects demanded attention at different times, but never zero attention. That constant drain was a major reason the project ran long.

A related lesson: starting a new project while another is in progress is risky unless the team's capacity and priorities are clearly defined upfront. Parallel workstreams without hard boundaries quietly erode focus and momentum in ways that are not obvious until you are deep in.

## Reflections

Three personal observations from this project worth sharing.

First, AI as a development tool is genuinely useful now. Throughout this project, it helped us implement, edit, and refactor code faster than we could have managed alone. It was especially useful for getting a first working version of features we had no prior experience with. Someone still needs to review the output, but used well, it saves real time.

Second, small details matter more than you might expect. In a software product, the gap between good and great often comes down to font size, spacing, color application, and micro animations. There is a thin line between deliberate detail and visual noise. Staying on the right side of that line is part of the craft.

Third, bug bash sessions and beta testing are not optional on a project of this scale. Small issues go unnoticed by the developers building the product. Without structured testing before release, they reach users instead.
