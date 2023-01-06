---
id: 291088
date: <% tp.date.now("YYYY-MM-DDTHH:mm:ss") %>
time: <% tp.date.now("HH:mm") %>
weight: <% await tp.system.prompt("Vikt", "", true) %>
effort: <% await tp.system.suggester(["1 (lätt)", "2", "3", "4", "5 (failure)"], ["1", "2", "3", "4", "5"]) %>
exercise: Rygg - Chins
muscle_group: Rygg
note: <% await tp.system.prompt("Anteckning", "", true) %>
reps: 6
sets: 6
video_url: "https://www.youtube.com/embed/zq74H17AjpU?feature=oembed"
instructions: 'Jobba med fullt utsträckta armar i bottenläget. Luta dig lätt bakåt i starten av rörelsen och hitta muskelkontakten med ryggmuskelaturen.'
tags:
 - exercise
---

```dataviewjs

const {exercise} = customJS;
const note = {dv: dv, container: this.container, window: window};

exercise.renderDescription(note);
exercise.renderEffortWeightChart(note);

```