---
date: <% tp.date.now("YYYY-MM-DD HH:mm:ss") %>
workout_title: Pass 2:1 Mage-Rygg-Biceps-Triceps
exercises: [293271, 291088]
workout_order: [293271, 291088]
workout: 2-1
type: 2
sub_type: 1
tags:
 - workout
---

```dataviewjs

const {workout} = customJS;
const note = {dv: dv, container: this.container, window: window};

workout.renderHeader(note);

```

## Remaining Exercises
```dataviewjs

const {workout} = customJS;
const note = {dv: dv, container: this.container, window: window};

workout.renderRemaining(note);

```

## Performed Exercises
```button
name Log
type command
action QuickAdd: Log
color green
```
^button-2vzj
```dataviewjs

const {workout} = customJS;
const note = {dv: dv, container: this.container, window: window};

workout.renderPerformed(note);
workout.renderEffortChart(note);

```