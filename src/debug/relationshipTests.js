// const newRel = new Relationship();

// console.log("New relationship: ", newRel);

// newRel.set_relationship_value('idf', 100);

// console.log("New relationship now: ", newRel, "should be pos extreme: ", newRel.is_pos_ex());

// newRel.modify_relationship('idf', -10, 2);

// console.log("Modified relationship, should be 100-20 = 80 now: ", newRel);

// newRel.memorize("savedByPlayer", {count: 1});

// console.log("Added new memory, memory now: ", newRel.get_all_memory());
// console.log("This is the added memory: ", newRel.get_memory('savedByPlayer'));

// newRel.forget('falseFlag');
// newRel.forget('savedByPlayer');
// console.log("Forgot a memory, here's the updated memory: ", newRel.get_all_memory());


// console.log("Moved on to test relationship manager.");

const relManager = new RelationshipManager();

// const chenru = new BaseCharacter();
// chenru.tag = 'chenru';

const newNPC = new BaseCharacter();
newNPC.tag = "new";

// relManager.add_relationship(chenru, newRel);

// console.log('This is the manager now: ', relManager);

// console.log("Result of whether the relational manager has rel with new NPC: ", relManager.has_relationship_with(newNPC));

// console.log("Result of whether the relational manager has rel with chenru: ", relManager.has_relationship_with(chenru));

// console.log("Did it find the relationship with chenru?: ", relManager.find_relationship_with(chenru));

// console.log("could I remove this relationship? ", relManager.remove_relationship(newNPC));

// relManager.remove_relationship(chenru);

const testRel = new Relationship();

testRel.set_relationship_value('idf', -100);

console.log(testRel);

relManager.add_relationship(newNPC, testRel);

console.log(relManager);


console.log("Result of whether the relational manager has rel with chenru: ", relManager.has_relationship_with(newNPC));

console.log("Did it find the relationship with chenru?: ", relManager.find_relationship_with(newNPC));

relManager.remove_relationship(newNPC);

console.log(relManager);
