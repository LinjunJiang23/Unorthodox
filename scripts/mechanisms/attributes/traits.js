let trait_id = 0;

class Trait {
	constructor(name, desc, posOrNeg, category, weight) {
		if (typeof name === 'string') this.name = name;
		if (typeof desc === 'string') this.desc = desc;
		if (typeof posOrNeg === 'boolean' ) this.posOrNeg = posOrNeg;
		if (typeof category === "string") this.category = category;
		if (typeof weight === 'number') this.weight = weight;
		this.trait_id = trait_id;
		trait_id++;
	}
	
	getTraitId() {
		return this.trait_id;
	}
}

/* Static Sources*/
const traits = [
	new Trait('射雕英雄传', '你的远程攻击命中率大幅提升', true, 'combat', 5),
	new Trait('孙子兵法', '你的逃跑成功概率小幅提升', true, 'combat', 25),
	new Trait('快慢刀', '你的攻击令人捉摸不定', true, 'combat', 5),
	new Trait('空刀', '你有一定概率手下留情不攻击', false, 'combat', 20),
	new Trait('葫芦娃舅爷爷', '打在你的同行者身上的攻击有概率转移到你身上', false, 'combat', 20),
	new Trait('机你太美', '你有种令人难忘的氛围', true, 'relationship', 1),
	new Trait('喂我五十', '你穷得厉害的时候同你关系好的人有一定概率施舍灵石', true, 'relationship', 5),
	new Trait('天选罗伯特','你在对话时有极小概率召唤滚滚天雷', false, 'relationship', 20), 
	new Trait('人机', '有时你说不出人话', false, 'relationship', 50),	
	new Trait("耐劈王", '你不易在雷劫中报废', true, 'survival', 10),
	new Trait('节能模式', '你行动所需的灵石小幅降低', true, 'survival', 20),
	new Trait('复活吧', '你有小概率能进行两次判定尝试', true, 'survival', 20),
	new Trait('烫手', '你行动时有概率死机，使行动所需回合+1', false, 'survival', 30),
	new Trait('人类', '你自我检修时有概率被电', false, 'survival', 20)
];

class CharacterTraitManager {
	constructor(traits) {
		if (typeof traits === 'object' && traits[0] instanceof Trait) this.traits = traits;
	}

    addTrait(trait_index) {
        this.traits.push(traits[trait_index]);
    }

    getTraits() {
        return this.traits;
    }

    clearTraits() {
        this.traits = [];
    }
}

function generateTraits() {
    // First, create a cumulative sum array based on trait weights
    let cumulativeWeights = [];
    let totalWeight = 0;
	let attempts = 0;

    traits.forEach((trait) => {
		if (typeof trait.weight !== 'number' || isNaN(trait.weight)) {
        console.warn(`Invalid weight for trait ${trait.name}: ${trait.weight}`);
        return; // Skip this trait
		}
        totalWeight += trait.weight; // Use original weights
        cumulativeWeights.push(totalWeight);
    });

    if (totalWeight <= 0) {
        console.error("Total weight is zero or negative. Please check your trait weights.");
        return []; // Exit if the total weight is not valid
    }

    let selectedTraits = new Set(); // Use a Set to avoid duplicates

    while (selectedTraits.size < 4 && attempts < 100) {
        // Pick a random number between 0 and totalWeight
        let randomNum = Math.random() * totalWeight;

        // Binary search for the correct trait based on the random number
        let index = binarySearch(cumulativeWeights, randomNum);

        // Add the selected trait (avoid duplicates automatically due to Set)
        selectedTraits.add(traits[index]);
		attempts++;
    }

    return Array.from(selectedTraits); // Convert Set to array and return
};

// Helper function: Binary search to find the corresponding trait
function binarySearch(arr, value) {
    let low = 0;
    let high = arr.length - 1;

    while (low < high) {
        let mid = Math.floor((low + high) / 2);
        if (arr[mid] < value) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return low < arr.length ? low : arr.length - 1;
};

function appendRandomTraits() {
	const t = generateTraits();
                // Clear previous traits (if necessary)
                $('#randomizeTraits').html('');
                // Append the generated traits with a proper line break
     t.forEach((trait) => {
          $('#randomizeTraits').append(`<span class="trait" 
		  style="color: ${trait.posOrNeg ? 'green' : 'red'}" 
		  data-trait-index="${trait.getTraitId()}">${trait.name}</span><br>`);
     });
};

$(document).on('click', '#randomizeTraitButton', () => {
    appendRandomTraits();
});