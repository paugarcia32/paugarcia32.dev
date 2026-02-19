---
title: "EETAC GO"
description: "Full stack Mobile Application"
date: "Jun 29, 2023"
repoURL: "https://github.com/paugarcia32/EETAC-GO"
tags: ["Express.js", "Flutter", "MongoDB", "Teamwork"]
---

# Project Overview

EETAC GO is a mobile application designed for CBL (Campus Baix Llobregat) students to discover, explore, and enjoy the campus. The app lets users complete location-based challenges by finding hidden QR codes around the campus, while also connecting with other users through a built-in community chat.

This was a semester-long university project developed by a team of 5 members. It was our first experience working with Agile methodologies at this scale, combining **SCRUM** for sprint planning and backlog management with **XP (Extreme Programming)** practices for code quality and collaboration.

---

# Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile app | Flutter (Dart) |
| Backend API | Node.js + Express.js |
| Database | MongoDB |
| Tooling | GitHub, Docker Hub, MongoDB Compass |

The mobile app was built with Flutter, giving us cross-platform support for both iOS and Android from a single codebase. The backend exposes a REST API built with Express.js, and MongoDB was chosen as the database for its flexible document model, well-suited to the varied data structures of the app.

---

# Design Process

Working as a team of 5 over a full semester, we organized the project into sprints following the SCRUM framework. Each sprint had defined goals, a backlog review, and a retrospective — it was the first time most of us applied this methodology in practice, and it significantly shaped how we approached planning and task distribution.

XP practices helped us keep code quality consistent: we adopted pair programming sessions for complex features and kept the codebase reviewed within the team before merging.

Key technical decisions made during the process:

- **Flutter over native**: A single codebase for iOS and Android reduced complexity for a team without mobile specialists.
- **MongoDB**: Document-based storage made it easy to iterate on data models during early sprints without rigid schema migrations.
- **REST API with Express.js**: Straightforward to build and integrate with the Flutter client using standard HTTP requests.
- **Docker**: Used to containerize the backend, making local development consistent across team members' machines.

---

# Features

## Campus Challenges

The core experience of the app. Users explore the campus by following itineraries and completing activities. Each activity requires finding a hidden QR code at a physical location on campus to mark it as completed.

The home screen displays an interactive map showing the user's current position, nearby challenges, and available itineraries via a sliding panel.

## Community Chat

Each challenge has its own global chat room where users can communicate with others working on the same activity. This adds a social and community layer to the exploration experience.

## Discover

A social tab where users can browse all active accounts, filter by name, and follow or unfollow others.

## Profile & Progression

Users have a profile with editable information, a profile picture, and a follower/following system. Completing routes earns badges and contributes to a level progression system, adding a gamification layer to the campus exploration.

## Accessibility

- **Dark mode and light mode**: Adapts to user preferences or system settings.
- **Multilingual**: Available in Spanish, Catalan, English, and Chinese.

---

# Conclusions

EETAC GO was a significant learning experience on multiple fronts. Beyond the technical side — building a full-stack application with Flutter, Express.js, and MongoDB — it was the first time working within a structured Agile process with a real team, deadlines, and a shared codebase.

Managing a project across 5 people, coordinating sprints, resolving merge conflicts, and making collective architecture decisions taught us as much as the technology itself. The result is a functional, cross-platform mobile application with real features: location-based challenges, live chat, social profiles, and a gamification system.
