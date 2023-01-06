module.exports = async function listFiles(params) {
    // Grab fileType variables
    console.log("Script: Create new workout.")

    const obsidian = params.obsidian;
    const templater = app.plugins.plugins["templater-obsidian"].templater;
    const activeFile = app.workspace.getActiveFile();
    const cache = this.app.metadataCache;
    const files = this.app.vault.getMarkdownFiles();
    let workouts = [];

    for(const file of files)
    {
        const file_cache = cache.getFileCache(file);
        const tags = obsidian.getAllTags(file_cache);
       
        let id;
        let metadata = app.metadataCache.getFileCache(file);
        if(metadata.frontmatter == null) // frontmatter is null if there are no front matter paramters are set
            id = null;
        else
            id = metadata.frontmatter['id'];

        if (tags.includes("#workout") && id == null) {
            workouts.push(file);
        }
    }

    function sortworkout(a, b)
    {
        // "Natural" sorting
        return a.basename.localeCompare(b.basename, undefined, {numeric: true, sensitivity: 'base'})       
    }

    hemmagym = workouts.filter(w => w.basename.includes('Hemmagym')).sort(sortworkout);
    gym = workouts.filter(w => !w.basename.includes('Hemmagym')).sort(sortworkout);

    workouts = [].concat(gym);
    // Hemmagym should come last
    workouts = workouts.concat(hemmagym);
    
    // Display files to select
    const notesDisplay = await params.quickAddApi.suggester(
        (file) => file.basename,
        workouts
    );

    // Expand template
    console.log("Creating note from template: " + notesDisplay.path);
    let templateFile = app.vault.getAbstractFileByPath(notesDisplay.path);
    // Get folder of active file
    let tmp = app.vault.getAbstractFileByPath(activeFile.path).parent;
    let now = moment(new Date());
    let nameWoExt = templateFile.name.replace('.md', '')
    let targetPath = 'Workouts/' + now.format("YYYY-MM-DD") + ' - ' + nameWoExt;
    var folderExists = await app.vault.exists(targetPath);
    if(!folderExists)
    {
        await app.vault.createFolder(targetPath);
        await app.vault.createFolder(targetPath + '/Log');
    }
    // Get TFolder of target path for new file
    let targetFolder = app.vault.getAbstractFileByPath(targetPath);
    // Create new file from template
    let fileName = nameWoExt + ".md";
    let newNote;
    if(! await app.vault.exists(targetPath + '/' + fileName))
        newNote = await templater.create_new_note_from_template(templateFile, targetFolder, fileName, false);
    else
    {
        params.variables = { notePath: "" };
        return;
    }
    // This should work (using MetaEdit plugin) but it doesn't (2022-08-29)
    //  await update("id", newId, newNote.path);
  
    // Add id manually to FontMatter of new file
    let content = await app.vault.read(newNote);
    const regex = /---\n+/m;
    const subst = '---\nid: ' + generateGuid() + '\n';
    content = content.replace(regex, subst);
    console.log(content, );
    await app.vault.modify(newNote, content);    

    // Pass selected note's path to notes variable
    params.variables = { notePath: newNote.path };
}

function generateGuid() {
  let result, i, j;
  result = '';
  for(j=0; j<6; j++) {
    if( j == 4 || j == 8 || j == 12 || j == 16)
      result = result + '-';
    i = Math.floor(Math.random()*16).toString(16).toUpperCase();
    result = result + i;
  }
  return result;
}