function getCTX(target) {
	if (typeof target === 'string') {
		const canvas = document.getElementById(`canvas-${target}`);
		const ctx = canvas.getContext('2d');
		return ctx;
	}
	return null;
};



