---
title: "Six Months of Lessons"
description: "What a 'Three-Week' Redesign Actually Taught Us"
date: "Jan 18 2026"
tags: ["project-management", "lessons-learned", "development"]
draft: false
---


Over the past six months, we've been working on a large project: redesigning our mobile application.

As one would expect, the time allocated for this project, which was originally between two and three weeks, was nowhere near the actual time. Throughout this article, I'll try to walk through the problems we faced, the lessons we've learned, and a few other thoughts.

Before we get into the content of the article, there are a few things that need to be said. This project took place between mid-August and mid-January. We're a small startup with two engineers: one junior (myself) and one senior. We're not a large team, which means our bandwidth is moderate. We're not working on the product 24/7, but we also need to handle the technical side of new clients entering our system, as well as the technical support clients need because of the lack of features our product currently has.

Having said that, here are my thoughts.

## Difficulties

One of the biggest problems that we faced was our lack of experience with this type of project. There were a number of shortcuts that we didn't know existed that would have helped us develop faster and cleaner code. A good example of this was our initial theme implementation, which we did entirely ourselves, making mistakes, then going back to correct them, and finally going back to correct them again. There are tools available that can help you configure a Flutter theme's colors, typography, spacing, and sizing without having to do it manually. Not knowing this early on cost us a lot of time.

It's worth noting that by implementing everything ourselves, we gained a good understanding of the system, and if we ever need to change anything in the future, we will know exactly where to look and what to do.

Another important challenge was that of the true capacity of the team. The team consisted of only two developers. As a result, any loss of time by the team members or any shift of focus towards other tasks that were not part of the redesign meant that the team would be able to accomplish only half of what it was capable of. It is always difficult to assess the true capacity of a team, and it is even more difficult when that team is also responsible for other aspects of the business.

The biggest challenge of all was that of the true size of the project. As discussed earlier, it was initially believed that it would take two to three weeks to finish. As we progressed, however, it was clear that the project was growing exponentially. The redesign was also based on a vision of what this product would be, but this vision did not yet exist. As a result, it was necessary to create new flows, new user experiences, and new features to bring this vision to life. It was impossible to accurately define the scope of this project from the very beginning.


## Lessons Learned

The most important lesson learned through this project was that in order to define the scope of a project well, one had to have a good grasp of three factors: the expected output, the actual capacity of the team, and the potential setbacks that may occur during the execution of the project. Not leaving any room for error does not amount to estimating; rather, it amounts to wishful thinking. In any project that takes a long time to execute, there are bound to be setbacks.

One of the instances in our project was during the redesign. At this time, the team was working on two other projects. The two projects needed more or less dedication at different times, but they never needed zero dedication. The two projects significantly contributed to the fact that the project took far longer than expected.

A related lesson is the value of not beginning a new project while another is already in progress, unless the capabilities and priorities of the team have been specifically factored in. Parallel workstreams without well-defined boundaries can have a corrosive impact on focus and momentum that is hard to grasp initially.

## Reflections

Apart from these structural lessons, there are a few more personal reflections that I thought were worth sharing.

One of these is just how far AI as a development tool has come. Throughout this project, AI was invaluable in helping us implement, edit, and refactor code at a rate we would not have managed otherwise. It was especially useful in creating a first working version of features that we had no idea how to get started with in the first place. While someone still needs to look over the code produced by AI to ensure everything works as expected, used well, it’s a genuine time-saver.

The second reflection is with respect to the power of small details. In a software product, the difference between a good product and a great product can often be determined by small details, such as the correct font size, correct spacing, correct application of color schemes, and correct application of micro animations. However, there is a thin line between correct application of small details and overuse of small details to the extent of creating visual noise. The correct application of small details, staying on the right side of the line, is part of the craft.

Lastly, I want to emphasize the significance of bug bash sessions and beta testing. In a product of this scale, small bugs and minor issues can go unnoticed by the developer. The product may suffer if these bug bash sessions and beta testing are not conducted before release. The product may appear less polished in the eyes of the consumer.
