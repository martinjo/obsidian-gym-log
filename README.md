# Obsidian Gym Log
A simple gym workout log for [Obsidian](https://obsidian.md/).

To use this you need to edit your own exercises and workouts.
There is a basic example workout with two exercises included.

There are three different views/pages:
- Overview / a list of workouts that have been performed. This includes a heatmap.
- A workout view. Includes a list of remaining and performed exercies. 
  - Has en effort graph at the bottom
- An exercise view that shows instructions and the last few times this exercise was performed.
  - Has en effort/weight graph at the bottom
  
## Usage instructions
1. Open the "Workout list" note
2. Press the "Add workout" button
3. Choose one a workout in the list that appears (there is only one example workout included)
4. Go to the newly created workout by pressing it in the workout list
5. Press the "Log" button
6. Select an exercise from the list that appears.
  - The list includes:
    - "Start" - Will be the only item to appear in the list when no exercies has been logged. Will log the current time as start of the workout
    - Remaining exercises (performed ones are filtered out)
    - "Custom" - Log a custom exercise
    - "Show all exercises" - removes the filter and shows all exercies regardless of if they have been logged during this workout

<img width="704" alt="image" src="https://user-images.githubusercontent.com/1998726/212776351-fd77ebb8-7c00-413f-b4c1-eb435db52e57.png">


## Screenshots
### Workout list
<img width="757" alt="image" src="https://user-images.githubusercontent.com/1998726/212775247-299b598f-8a13-4890-8096-a934053d53f4.png">

### Workout
<img width="752" alt="image" src="https://user-images.githubusercontent.com/1998726/212775278-9d5865b4-ca97-401d-83f2-7158ac2a5cc4.png">

### Exercise
<img width="738" alt="image" src="https://user-images.githubusercontent.com/1998726/212775484-53bc6b46-ad21-4088-b398-fd3ce2699564.png">

# Configuration

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
