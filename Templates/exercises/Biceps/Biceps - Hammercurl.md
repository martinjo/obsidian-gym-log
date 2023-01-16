---
id: 293271
date: <% tp.date.now("YYYY-MM-DDTHH:mm:ss") %>
time: <% tp.date.now("HH:mm") %>
weight: <% await tp.system.prompt("Weight", "", true) %>
effort: <% await tp.system.suggester(["1 (easy)", "2", "3", "4", "5 (failure)"], ["1", "2", "3", "4", "5"]) %>
exercise: Biceps - Hammercurl
muscle_group: Biceps
note: <% await tp.system.prompt("Note", "", true) %>
reps: 6
sets: 6
video_url: "https://www.youtube.com/embed/xb6XLeWUVr8?feature=oembed"
instructions: 'This is the instruction for this workout'
tags:
 - exercise
---

```dataviewjs

const {exercise} = customJS;
const note = {dv: dv, container: this.container, window: window};

exercise.renderDescription(note);
exercise.renderEffortWeightChart(note);

```