// This file sets up the proper inheritance relationships
// after all classes have been defined

import { General } from './General';
import { Any } from './Any';
import { None as NoneImpl, Void } from './None';

// Set up proper prototype chain for None
Object.setPrototypeOf(NoneImpl.prototype, General.prototype);

// Export everything properly initialized
export { General, Any, NoneImpl as None, Void };