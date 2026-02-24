---
title: "Introduction to Embedded Systems"
description: "A practical starting point for embedded systems: setting up the environment, choosing hardware, and learning by building."
date: "Apr 28, 2024"
tags: ["IoT", "Arduino", "ESP32"]
---
## Introduction

Embedded systems are everywhere. This post documents my experience getting started with them through personal projects. Nothing professional, just hands-on exploration.

## Setting up the environment

Working with embedded systems requires both hardware and software. Here is what I use.

### Software

There are many options. These are the ones I prefer.

#### Arduino IDE

The simplest and most complete option is the [Arduino IDE](https://www.arduino.cc/en/software). It comes with built-in access to the [Arduino Library Repository](https://www.arduinolibraries.info/), which makes installing libraries straightforward.

It also includes a Serial Monitor, which lets you read the board's output or send inputs to it. You need to set the correct baud rate to match what the sketch uses, or the output will be garbled.

#### CLI setup

For terminal users, Arduino provides the [Arduino CLI](https://github.com/arduino/arduino-cli), which covers most of what the IDE does.

The team also maintains the [Arduino Language Server](https://github.com/arduino/arduino-language-server) for Neovim, installable via [Mason](https://github.com/williamboman/mason.nvim).

For a serial monitor in this setup, [PuTTY](https://www.putty.org/) works well. It has a GUI, but also supports CLI usage. The [official documentation](https://the.earth.li/~sgtatham/putty/0.62/htmldoc/Chapter3.html) covers the command-line options.

### Hardware

If software options are many, hardware options are far more. A few items show up in almost every project.

#### Common materials

- Cables
- Breadboards
- Sensors
- Microcontrollers

#### Microcontrollers

Several microcontrollers pack a lot of features at low cost:

- ESP32
- Arduino (Uno, Nano, Mega)
- STM32
- Raspberry Pi Zero

Each has different strengths. The right choice depends on the project requirements: connectivity, processing power, power consumption, and available pins all vary significantly.

## Learning by building

As with most programming areas, the fastest way to learn is by building things. IoT projects work well for this: you get immediate, physical feedback. Some directions worth exploring:

- **LoRa modules** for long-range, low-power communication
- **MQTT or CoAP** for lightweight messaging between devices
- **RTOS** (Real-Time Operating System) concepts, useful for projects that need precise timing or concurrent tasks, and require no extra hardware to get started

## Resources

A few resources that I found genuinely useful when starting out:

- [r/embedded](https://www.reddit.com/r/embedded/)
- [Random Nerd Tutorials](https://randomnerdtutorials.com/)
- [Embedded Engineering Roadmap](https://github.com/m3y54m/Embedded-Engineering-Roadmap)
