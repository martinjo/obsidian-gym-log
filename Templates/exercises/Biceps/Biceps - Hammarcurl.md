---
id: 293271
date: <% tp.date.now("YYYY-MM-DDTHH:mm:ss") %>
time: <% tp.date.now("HH:mm") %>
weight: <% await tp.system.prompt("Vikt", "", true) %>
effort: <% await tp.system.suggester(["1 (lätt)", "2", "3", "4", "5 (failure)"], ["1", "2", "3", "4", "5"]) %>
exercise: Biceps - Hammarcurl
muscle_group: Biceps
note: <% await tp.system.prompt("Anteckning", "", true) %>
reps: 6
sets: 6
video_url: "https://www.youtube.com/embed/xb6XLeWUVr8?feature=oembed"
instructions: 'Ordentlig lutning på bänken, håll överarmen still och jobba enbart med biceps'
tags:
 - exercise
---

```dataviewjs

const {exercise} = customJS;
const note = {dv: dv, container: this.container, window: window};

exercise.renderDescription(note);
exercise.renderEffortWeightChart(note);

```