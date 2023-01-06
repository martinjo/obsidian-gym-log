
class workout
{
	renderHeader(n)
	{
		let self = n.dv.current()

		var timeStamp = moment(new Date(self['date']));
		var diff_days = timeStamp.diff(new Date(), "days");
		let date = moment(new Date(self['date']));
		console.log(diff_days);

		if(diff_days == 0)
			n.dv.header(1, date.format('YYYY-MM-DD') + " (idag)");
		else if(diff_days == -1)
			n.dv.header(1, date.format('YYYY-MM-DD') + " (igår)");
		else if(diff_days == -2)
			n.dv.header(1, date.format('YYYY-MM-DD') + " (i förrgår)");
		else
			n.dv.header(1, date.format('YYYY-MM-DD'));
	}

	renderRemaining(n)
	{
		let metadata = app.metadataCache.getFileCache(n.dv.current().file);
		// Type / index of workout
		let workoutExerciseIds = metadata.frontmatter['exercises'];
		let workout_order = metadata.frontmatter['workout_order'];
		// Get id of this workout
		let workoutId = metadata.frontmatter['id'];
		let allExercises = n.dv.pages('#exercise');
		let performedExercisesForThisWorkout = [];
		let allPerformedExercises = [];
		let templateExercisesForThisWorkout = [];

		// Workout with old format -> no remaining exercises!
		if(workoutExerciseIds == null)
			allExercises = []

		for(var e of allExercises)
		{
			console.log("loop");
			let metadata = app.metadataCache.getFileCache(e.file);
		    // Get the id from this exercise
		    let e_workoutId = metadata.frontmatter['workout_id'];
		    let e_id = metadata.frontmatter['id'];
			// if matching the workout id -> this exercise is already performed
			if(e_workoutId == workoutId)
				performedExercisesForThisWorkout.push(e);
			else if(e_workoutId != null)
				allPerformedExercises.push(e);
			else if(workoutExerciseIds.includes(e_id))
			{
				e.index = workout_order.indexOf(e_id);
				templateExercisesForThisWorkout.push(e);
			}
		}

		// Filter out performed exercises
		let remainingExercises = templateExercisesForThisWorkout.filter(e=> !performedExercisesForThisWorkout.find(tw=> tw['id'] == e['id']));

		// Sort according to set workout order
		remainingExercises.sort(function(a, b)
		{
			if( a.index === Infinity )
				return 1;
			else if( isNaN(a.index))
				return -1;
			else
				return a.index - b.index;
		});

		// Create new array with template exercices that contains last performed duration
		var templateExercies = [];
		for(var e of remainingExercises)
		{
			//let metadata = app.metadataCache.getFileCache(e.file);
		    // Get workout id for this exercise
		    //let e_id = metadata.frontmatter['workout_id'];

			// filter out performed exercises
			let thisExercise = this.fixExerciseName(e['exercise']);
			let tmp = allPerformedExercises.filter(pe=> thisExercise.includes(this.fixExerciseName(pe['exercise'])) || pe['id'] == e['id']);
			tmp = tmp.sort(function(a,b)
			{
			  // Turn your strings into dates, and then subtract them
			  // to get a value that is either negative, positive, or zero.
			  return new Date(a['date']) - new Date(b['date']);
			});

			// Select last excercise
			let lastPerformed = tmp[tmp.length-1];
			if(lastPerformed == null)
				lastPerformed = {};

			templateExercies.push(['[[' + e.file.path + '|' + e['exercise'] + ']]', e["muscle_group"], lastPerformed["weight"], lastPerformed["effort"]]);
		}

		n.dv.table(["Övning", "💪🏻-grupp", "🏋🏼", "😥"], templateExercies);
		    //.sort( e=> e['muscle_group'], 'desc'));
	}

	renderPerformed(n)
	{
		let metadata = app.metadataCache.getFileCache(n.dv.current().file);
		let workoutId = metadata.frontmatter['id'];
		let pages = n.dv.pages("#exercise")
		let exercises = pages.sort(p => p['date'], 'asc');

		var performedExercises = [];
		let prevTimeStamp;
		let firstTimeStamp;
		let lastTimeStamp;
		let i = 0;
		for(const e of exercises)
		{
			metadata = app.metadataCache.getFileCache(e.file);
			let exerciseId = metadata.frontmatter['workout_id'];
			if(exerciseId != workoutId)
				continue;

			// Set prevTimeStamp and FirstTimeStamp if this is the first exercise
			if(i==0)
			{
				prevTimeStamp = moment(new Date(e['date']));
				firstTimeStamp = prevTimeStamp;
			}


			var timeStamp = moment(new Date(e['date']));
			// Save last time stamp, we don't know how many exercises we have...
			lastTimeStamp = timeStamp;

			var diff_sec = timeStamp.diff(prevTimeStamp, "seconds");
			var diff_min = Math.floor(diff_sec / 60).toString();
			var diff_sec_remain = (diff_sec % 60).toString();
			var timeDiff = diff_min + 'm ' + diff_sec_remain + "s";
			if(i==0)
				timeDiff = timeStamp.format("HH:mm");

			performedExercises.push(['[[' + e.file.path + '|' + e['exercise'] + ']]', e["weight"], timeDiff, e['note']]);
			prevTimeStamp = timeStamp;
			i++;
		}

		n.dv.table(["Övning", "🏋🏼", "⏱", "🗒"], performedExercises);

		if(lastTimeStamp != null && firstTimeStamp != null)
		{
			let total_sec = lastTimeStamp.diff(firstTimeStamp, "seconds");
			let diff_hours = (total_sec / 3600).toString();
			diff_hours = Math.floor(diff_hours);
			var diff_min_remain = ((total_sec % 3600)/60).toString();
			diff_min_remain = Math.round(diff_min_remain);
			let totalTimeStr = diff_hours + "h " + diff_min_remain + "m";

			n.dv.header(3, "Träningstid: " + totalTimeStr);
		}
	}

	renderEffortChart(n)
	{
		const {utils} = customJS;
		const data = n.dv.current()
		let metadata = app.metadataCache.getFileCache(data.file);
		// exercise
		let workoutId = metadata.frontmatter['id'];
		let allFiles = app.vault.getMarkdownFiles();

		n.dv.header(2, "Ansträngningsprofil")

		let performedExercises = utils.filterFiles((fm, tags) => { return tags.includes('#exercise') && fm['workout_id'] === workoutId;}, allFiles);
		performedExercises = utils.addTagsAndFrontmatter(performedExercises);

		// Sort by time performed. Seems this is sometimes needed on iOS, but not on
		// desktop?
		performedExercises = performedExercises.sort(function(a,b)
			{
			  // Turn your strings into dates, and then subtract them
			  // to get a value that is either negative, positive, or zero.
			  return new Date(a.frontmatter['date']) - new Date(b.frontmatter['date']);
			});

		const datum = performedExercises.map( (e) => { return moment(new Date(e.frontmatter['date'])); });
		const efforts = performedExercises.map( (e) =>{ return e.frontmatter['effort']; });

		const datasets = {
		  labels: datum,
		  datasets: [
		    {
		      label: 'Ansträngning',
		      data: efforts,
		      borderColor: [ 'rgb(232, 15, 136)' ],
		      //backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
		      borderWidth: 3,
		      xAxisID: 'x',
		      yAxisID: 'y1',
		    }
		  ]
		};

		console.log('4')

		let scales =
		{
			 x: {
					type: 'time',
					time: {
						unit: 'minute',
						displayFormats: {
							minute: 'HH:mm'
						}
					}
		        },
			y1:
			{
				title:
				{
					display: true,
					text: 'Ansträngning'
				},
				min: 0,
				max: 6,
				ticks:
				{
					// Display only if between 1 and 5
					callback: function(value, index, ticks)
					{
						return value > 0 && value < 6 ? value : '';
					}
				},
				type: 'linear',
				display: true,
				position: 'right',
				// grid line settings
				grid:
				{
					drawOnChartArea: false, // only want the grid lines for one axis to show up
				}
			}
		};


		console.log('2')

		const chartData =
		{
			type: 'line',
			data: datasets,
			options:
			{
			    responsive: true,
			    interaction: {
			      mode: 'index',
			      intersect: false,
			    },
			    stacked: false,
			    layout: {
				    padding: -5
				},
				plugins:
				{
					yScaleText:
					{
						fontSize: 20,
						fontColor: 'rgba (255, 26, 104, 1)',
						title: 'test'
					}
				},
				scales: scales,
				plugins:
				{
					tooltip:
					{
					    callbacks:
					    {
					        title: function(context)
					        {
						        return 'Övning:';
					        },
					        label: function(context)
					        {
						        let e = performedExercises[context.dataIndex];
						        return ' ' + e['exercise'];
					        },
							afterLabel: function(context)
							{
								let e = performedExercises[context.dataIndex];
								return ' Ansträngning: ' + e['effort'];
							}
					    }
				    }
				}
		    }
		}

		console.log('1')

		window.renderChart(chartData, n.container);

		function findPrevExercise(exercise)
		{
			let exercises = n.dv.pages('#exercise').sort(e=> e['date'], 'desc');
			for(let e of exercises)
			{
				if(new Date(e['date']) < new Date(exercise['date']))
					return e;
			}
		}

	}

	fixExerciseName(e)
	{
		return e.replace(' - ', ' ').toLowerCase();
	}
}