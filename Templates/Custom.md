---
id: custom
date: <% tp.date.now("YYYY-MM-DDTHH:mm:ss") %>
time: <% tp.date.now("HH:mm") %>
weight: <% await tp.system.prompt("Vikt", "", true) %>
effort: <% await tp.system.suggester(["1 (lätt)", "2", "3", "4", "5 (failure)"], ["1", "2", "3", "4", "5"]) %>
exercise: <% await tp.system.prompt("Övning", "", true) %>
muscle_group: <% await tp.system.suggester(["Axlar", "Ben", "Biceps", "Bröst", "Mage", "Rygg", "Triceps"], ["Axlar", "Ben", "Biceps", "Bröst", "Mage", "Rygg", "Triceps"]) %>
note: <% await tp.system.prompt("Anteckning", "", true) %>
reps: 6
sets: 6
tags:
 - exercise
 - custom
---

```dataviewjs

const {exercise} = customJS;
const note = {dv: dv, container: this.container, window: this.window};

exercise.renderDescription(note);

```



```dataviewjs

const {exercise} = customJS;
const note = {dv: dv, container: this.container, window: window};

exercise.renderEffortWeightChart(note);

```