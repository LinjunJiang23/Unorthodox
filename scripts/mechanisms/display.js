const displayStats = (stats) => {
	let content;
	let t;
	let traitContent = '';
	t = player.traits.getTraits();
	t.forEach((trait) => {
	  traitContent += `<span class="trait" style="color: ${trait.posOrNeg ? 'green' : 'red'}" 
		              data-trait-index="${trait.getTraitId()}">${trait.name}</span><br>`;
	});
	let coreStat = player.stats.getCoreStats();
	content = `
	<div class="display-stats">
	  <div class="attributes">
		<h1>当前属性：</h1>
		<label>智慧: </label>
		<div class='int'>${coreStat['intelligence']}</div>
		<label>魅惑: </label>
		<div class='chr'>${coreStat['charm']}</div>
		<label>气运: </label>
		<div class='luck'>${coreStat['luck']}</div>
		<label>体质: </label>
		<div class='con'>${coreStat['constitution']}</div>
		<label>怨气: </label>
		<div class='res'>${coreStat['resentment']}</div>
		<label>怨气: </label>
		<div class='res'>${coreStat['insight']}</div>
	  </div>
	  <div class="traits">
	   <h1>当前特征：</h1>
	   ${traitContent}
	  </div>
    </div>`;
	updateOverlay(content);
};

const displayQuest = () => {
	return `
	<div class="display-quest">
		<label>任务: </label>
	</div>
	`;
};

const displayRelationship = () => {
	return `
	<div class="display-relationship">
		<label>关系: </label>
	</div>
	`;
};