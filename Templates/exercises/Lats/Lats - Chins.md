---
id: 291088
date: <% tp.date.now("YYYY-MM-DDTHH:mm:ss") %>
time: <% tp.date.now("HH:mm") %>
weight: <% await tp.system.prompt("Weight", "", true) %>
effort: <% await tp.system.suggester(["1 (easy)", "2", "3", "4", "5 (failure)"], ["1", "2", "3", "4", "5"]) %>
exercise: Back - Chins
muscle_group: Back
note: <% await tp.system.prompt("Note", "", true) %>
reps: 6
sets: 6
video_url: "https://www.youtube.com/embed/zq74H17AjpU?feature=oembed"
instructions: 'This is the instruction for this workout...'
tags:
 - exercise
---

```dataviewjs

const {exercise} = customJS;
const note = {dv: dv, container: this.container, window: window};

exercise.renderDescription(note);
exercise.renderEffortWeightChart(note);

```