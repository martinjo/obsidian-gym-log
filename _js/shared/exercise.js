
class exercise
{
	renderDescription(n)
	{
		const data = n.dv.current();
		let metadata = app.metadataCache.getFileCache(n.dv.current().file);

		let workout_id = metadata.frontmatter['workout_id'];

		let weight = metadata.frontmatter['weight'];
		let effort = metadata.frontmatter['effort'];
		let note = metadata.frontmatter['note'];

		if((weight != null || effort != null) && workout_id != null)
		{
			n.dv.header(2, "Previous log:")
			if(weight != null)
			{
				n.dv.el('b', 'Weight: ');
				n.dv.span(weight.toString() + '\t');
				n.dv.el("br", "");
			}

			if(effort != null)
			{
				n.dv.el('b', 'Effort: ');
				n.dv.span(effort.toString());
				n.dv.el("br", "");
			}

			if(note != null)
			{
				n.dv.el('b', 'Note ✏️: ');
				n.dv.span(note.toString());
			}
			n.dv.el("br", "");
		}
		let instructions=`None`;
		if(instructions!='None')
		{
			n.dv.header(2, 'Instructions');
			n.dv.paragraph(instructions)
		}

		let video_url = metadata.frontmatter['video_url'];
		if(video_url != null)
			n.dv.el('p', '<iframe title="' + metadata.frontmatter['exercise'] + '" src="' + video_url + '" height="113" width="200" allowfullscreen="" allow="fullscreen" style="aspect-ratio: 1.76991 / 1; width: 100%; height: 100%;"></iframe>')
	}

	renderEffortWeightChart(n)
	{
		const data = n.dv.current()
		let metadata = app.metadataCache.getFileCache(n.dv.current().file);
		// exercise
		let exercise = this.fixExerciseName(metadata.frontmatter['exercise']);
		let exercises = n.dv.pages('#exercise');
		let performedExercises = []

		n.dv.header(2, "Past exercises")

		for(var e of exercises)
		{
			let metadata = app.metadataCache.getFileCache(e.file);
		    // Get the id from this exercise
		    let exerciseId = metadata.frontmatter['workout_id'];
			let e_exercise = this.fixExerciseName(e['exercise']);

			// if id != null -> performed
			if(exerciseId != null && exercise == e_exercise)
				performedExercises.push(e);
		}

		performedExercises.sort(function(a,b){
		  // Turn your strings into dates, and then subtract them
		  // to get a value that is either negative, positive, or zero.
		  return new Date(a['date']) - new Date(b['date']);
		});

		const datum = performedExercises.map(e=> moment(new Date(e['date'])).format('YYYY-MM-DD'));

		const weights = performedExercises.map(e=> e['weight']);
		const efforts = performedExercises.map(e=> e['effort']);

		let weight_ds = {
		      label: 'Vikt',
		      data: weights,
		      borderColor: [ 'rgb(76, 0, 51)' ],
		      //backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
		      borderWidth: 3,
		      yAxisID: 'y',
		    };

		const datasets = {
		  labels: datum,
		  datasets: [
		    {
		      label: 'Effort',
		      data: efforts,
		      borderColor: [ 'rgb(232, 15, 136)' ],
		      //backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
		      borderWidth: 3,
		      yAxisID: 'y1',
		    }
		  ]
		};

		console.log('4')

		// Add weight dataset only if weights have been logged for this exercise
		let hasWeights = weights.length > 0 && !weights.every(value => value == null);

		if(hasWeights)
			datasets.datasets.push(weight_ds);

		// yScaleText plugin block
		const yScaleText =
		{
			id: 'yScaleText',
			afterDatasetsDraw(chart, args, options)
			{
				const { ctx, chartArea: {top}, scales: {x, y} } = chart;
				ctx. save();
				ctx.font = `${options.fontSize}px Arial`;
				ctx.fillStyle = options.fontColor;
				ct.fillText('Y Scale Title', 0, top - 15);
				ctx.restore ();
				console.log('hej')
			}
		};

		console.log('3')

		let scales =
		{
			y: {
				title:
				{
					display: true,
					text: 'Weight'
				},
				grace: 1,
				type: 'linear',
				display: true,
				position: 'left',
			},
			y1:
			{
				title:
				{
					display: true,
					text: 'Effort'
				},
				min: 0,
				max: 6,
				ticks:
				{
					// Include a dollar sign in the ticks
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

		// Hide weight axis if no weights have been logged for this exercise
		if(!hasWeights)
			scales.y.display = false;

		console.log('2')

		const chartData =
		{
			type: 'line',
			data: datasets,
			options: {
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
				scales: scales
		    }
		}

		console.log('1')

		n.window.renderChart(chartData, n.container);

		function findPrevExercise(n, exercise)
		{
			let exercises = n.dv.pages('#exercise').sort(ex=> ex['date'], 'desc');
			for(let e of exercises)
			{
				if(new Date(e['date']) < new Date(exercise['date']))
					return e;
			}
		}


		let i=0;
		let prevTimeStamp;
		let lastExercises = [];
		for(const e of performedExercises.slice(-5))
		{
			metadata = app.metadataCache.getFileCache(e.file);
			console.log('time!');
			let prev = findPrevExercise(n, e);
			prevTimeStamp = moment(new Date(prev['date']));

			var timeStamp = moment(new Date(e['date']));
			var diff_sec = timeStamp.diff(prevTimeStamp, "seconds");
			var diff_min = Math.floor(diff_sec / 60).toString();
			var diff_sec_remain = (diff_sec % 60).toString();
			var timeDiff = diff_min + 'm ' + diff_sec_remain + "s";

			let exercise = [];
			// File link (date as text)
			exercise.push('[[' + e.file.path + '|' + moment(new Date(e['date'])).format('YYYY-MM-DD') + ']]');
			// Duration
			exercise.push(timeDiff);
			// Weight
			if(hasWeights)
				exercise.push(e["weight"] + ' kg');
			// Effort
			exercise.push(e['effort']);
			// Note
			exercise.push(e['note']);
			lastExercises.push(exercise);

			prevTimeStamp = timeStamp;
			i++;
		}
		let columns = [];
		columns.push("Exercise");
		columns.push("⏱");
		if(hasWeights)
			columns.push("🏋🏼",);
		columns.push("😥");
		columns.push("🗒");

		n.dv.table(columns, lastExercises);
	}


	fixExerciseName(e)
	{
		return e.replace(' - ', ' ').toLowerCase();
	}

}