let obsidian = null;

module.exports = async function listFiles(params) {

    console.log("Script: Create exercise.")

    obsidian = params.obsidian;
    const templater = app.plugins.plugins["templater-obsidian"].templater;
    const dv = app.plugins.plugins['dataview'].api;
    const cache = this.app.metadataCache;
    let allFiles = this.app.vault.getMarkdownFiles();

    const activeFile = app.workspace.getActiveFile();
    let metadata = cache.getFileCache(activeFile);
    const exerciseIds = metadata.frontmatter['exercises'];
    const workout_id = metadata.frontmatter['id'];
    const exercises = [];

    // Count performed exercises
    const performedEx = filterFiles((fm, tags)=>{
        return (tags.includes('#exercise') || tags.includes('#start')) && fm['workout_id'] == workout_id;
    }, allFiles);
    let performedExerciseCount = performedEx.length;

    // If no exercises has been performed, add "start" 
    if(performedExerciseCount == 0)
    {
        const startEx = filterFiles((fm, tags) => {return tags.includes('#start') && fm['workout_id'] == null}, allFiles);
        exercises.push(startEx[0]);
    }
    else // add workout exercises that has not been performed
    {
        // Get all exercises for this workout
        const workoutEx = filterFiles((fm, tags) =>{
            return tags.includes('#exercise') && fm['workout_id'] == null && exerciseIds.includes(fm['id']);
        }, allFiles);
        // filter out performed exercises -> only remaining left
        const remainingEx = filterFiles((fm, tags) =>
        {
            return filterFiles((fm2, tags2)=> { return fm2['id'] == fm['id']}, performedEx).length == 0;

        }, workoutEx)
        exercises.push.apply(exercises, remainingEx);
    }

    excercies = exercises.sort((a, b) => {
      const nameA = a.name.toLowerCase(); // ignore upper and lowercase
      const nameB = b.name.toLowerCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });

    if(performedExerciseCount > 0)
    {
        // Add custom at bottom
        const custom = filterFiles(function(frontmatter, tags){ return tags.includes('#custom') && frontmatter['workout_id'] == null;}, allFiles);
        exercises.push(custom[0]);
        // Add choise to show all exercises, regardless of workout
        exercises.push({basename: 'Visa alla övningar'});
    }

    
    // Display files to select
    let notesDisplay = await params.quickAddApi.suggester(
        (file) => file.basename,
        exercises
    );

    if(notesDisplay == null)
    {
        params.variables = { notePath: "" };
        return;
    }

    if(notesDisplay.basename == 'Visa alla övningar')
    {
        let allExercises = filterFiles((frontmatter, tags)=>{return tags.includes("#exercise") && frontmatter['workout_id'] == null}, allFiles);
        // Display all exercises
        notesDisplay = await params.quickAddApi.suggester(
        (file) => file.basename,
        allExercises);
    }
    if(notesDisplay == null)
    {
        params.variables = { notePath: "" };
        return;
    }


    metadata = app.metadataCache.getFileCache(activeFile);
    const date = metadata.frontmatter['date'];
    newId = id = metadata.frontmatter['id'];
    console.log('id: ' + id);
    if(id == null)
    {
        console.log("No id set. Generating GUID")
        newId = generateGuid();
        console.log("Generated ID: " + newId);
        await update('id', newId, activeFile.path);
    }

    // Expand template
    let templateFile = app.vault.getAbstractFileByPath(notesDisplay.path);
    // Get folder of active file
    let tmp = app.vault.getAbstractFileByPath(activeFile.path).parent;
    // Get TFolder of target path for new file
    let targetFolder = app.vault.getAbstractFileByPath(tmp.path + "/Log");
    // Create new file from template
    let fileName = (targetFolder.children.length+1).toString()
    let newNote = await templater.create_new_note_from_template(templateFile, targetFolder, fileName, false);
    // This should work (using MetaEdit plugin) but it doesn't (2022-08-29)
    //  await update("id", newId, newNote.path);
  
    // Add id manually to FontMatter of new file
    let content = await app.vault.read(newNote);
    const regex = /---\n+/m;
    const subst = '---\nworkout_id: ' + newId + '\n';
    content = content.replace(regex, subst);
    

    await app.vault.modify(newNote, content);    

    // Pass selected note's path to notes variable
    params.variables = { notePath: newNote.path };
}


function filterFiles(filterFunction, files)
{
    const cache = app.metadataCache;
    const result = []
    for(let f of files)
    {
        const metadata = cache.getFileCache(f);
        const tags = obsidian.getAllTags(metadata);
        if(filterFunction(metadata.frontmatter, tags))
            result.push(f);
    }
    return result;
}


function generateGuid() {
  let result, i, j;
  result = '';
  for(j=0; j<6; j++) {
    if( j == 8 || j == 12 || j == 16 || j == 20)
      result = result + '-';
    i = Math.floor(Math.random()*16).toString(16).toUpperCase();
    result = result + i;
  }
  return result;
}