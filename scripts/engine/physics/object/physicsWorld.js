// scripts/physics/object/physicsWorld.js

const activePhysicsWorld = new Set();

function activateSection(section) {
	if (!section.hasPhysicsObjects) return;
	for (const physicsO of section.physicsObjects) {
		activePhysicsWorld.add(physicsO);
	}
};

function deactivateSection(section) {
	for (const physicsO of section.physicsObjects) {
		activePhysicsWorld.delete(physicsO);
	}
};

