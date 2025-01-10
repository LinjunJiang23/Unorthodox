// src/error/errorHandler.js

class ErrorHandler {
  constructor(eventManager) {
	this.eventManager = eventManager;
  }
  
  handle_error(error) {
	const { type, message, context, stack } = error;
	
	this.logError({ type, message, context, stack });
		
	if (type === 'critical') {
	  this.escalate_error(message);
	}
  }
  
  log_error({ type, message, context, stack }) {
	console.error(`[${new Date().toISOString()}] ${type.toUpperCase()}: ${message}`);
	if (context) console.log('Context: ', context);
	if (stack) console.log('Stack: ', stack);
  }
  
  escalate_error(message) {
	console.error(`Critical error occurred! Error is: `, message);
  }
  
  init_events() {
    this.eventManager.on('error', (payload) => {
	  const error = payload.error;
	  this.handle_error(error);
	});
  }
  
};