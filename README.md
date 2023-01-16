# Obsidian Gym Log
A simple gym workout log for [Obsidian](https://obsidian.md/).

To use this you need to edit your own exercises and workouts.
There is a basic example workout with two exercises included.

The example files still have Swedish text in them. That will be fixed eventually.

There are three different views/pages:
- Overview / a list of workouts that have been performed. This includes a heatmap.
- A workout view. Includes a list of exercies to perform showing the last weight used and what effort was needed.
- An exercise view that shows instructions and the last few times this exercise was performed.
- At the bottom is a graph of the logged effort and weights used when performing this exercise.

## Used plugins
The following amazing plugins are used:
- [Dataview](https://github.com/blacksmithgu/obsidian-dataview)
- [Buttons](https://github.com/shabegom/buttons)
- [Templater](https://github.com/SilentVoid13/Templater)
- [QuickAdd](https://github.com/chhoumann/quickadd)
- [Obsidian Charts](https://github.com/phibr0/obsidian-charts)
- [MediaExtended](https://github.com/aidenlx/media-extended)
- [Heatmap Calendar](https://github.com/Richardsl/heatmap-calendar-obsidian)
- [CustomJS](https://github.com/saml-dev/obsidian-custom-js)

## Screenshots
### Overview
<img width="500" alt="image" src="https://user-images.githubusercontent.com/1998726/211056655-33192041-1e1b-4523-b3fb-638a5bbce0dd.png">

### Workout
<img width="500" alt="image" src="https://user-images.githubusercontent.com/1998726/211057682-621bfac1-2452-49d3-b8ef-14ac3332516a.png">

### Exercise
<img width="747" alt="image" src="https://user-images.githubusercontent.com/1998726/211059980-11e28c40-948c-4634-8a7f-2636a1cca0ee.png">

## Configuration of QuickAdd
1. Open QuickAdd settings
2. Press "Manage macros"
3. Add two new macros named something like "Add exercise" and "Add workout"
4. Configure the macros by pressing "Configure"
5. Select a "User Script" corresponding to the macro you are configuring
<img width="184" alt="image" src="https://user-images.githubusercontent.com/1998726/212767899-0a338728-4d6e-4efb-ab02-0e663bcc42c9.png">
6. Press "Add"
Make sure you do this for both macros you created in #3
7. Back out to QuickAdd settings
8. Add two new "choices" of "Macro" type.
<img width="376" alt="image" src="https://user-images.githubusercontent.com/1998726/212768331-86bb9ef7-5049-4f1b-aba4-a69f2917bc47.png">
9. Press the "Cog" next to the "Choice" you added
10. Select the corresponding macro (Add workout or Add exercise)
11. Press the "Flash" symbol next to each choice to add and obsidian command for them

<br><br>
When completed it should look something like this:
<br><br>
<img width="540" alt="image" src="https://user-images.githubusercontent.com/1998726/212767442-ed2c4f23-a3b9-4bd6-9624-e3032c728a4a.png">
