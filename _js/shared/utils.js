
class utils{

	filterFiles(filterFunction, files)
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

	addTagsAndFrontmatter(files)
	{
	    const cache = app.metadataCache;
	    const result = []
	    for(let f of files)
	    {
	        const metadata = cache.getFileCache(f);
	        const tags = obsidian.getAllTags(metadata);
	        f['frontmatter'] = metadata.frontmatter;
	        f['tags'] = tags;
	    }
	    return files;
	}

}
