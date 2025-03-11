// This file sets up the proper inheritance relationships
// after all classes have been defined
// ## Зачем нужен InitializeCore?
// Файл InitializeCore.ts предлагается как решение проблемы циклических зависимостей. Он позволяет:

// 1. Сначала определить все классы без установления отношений наследования
// 2. Затем правильно настроить прототипы и отношения наследования
// 3. Экспортировать уже правильно настроенные классы
// Это позволяет избежать проблемы, когда один класс пытается наследоваться от другого, который еще не полностью определен.
import { General } from './General';
import { Any } from './Any';
import { None as NoneImpl, Void } from './None';

// Set up proper prototype chain for None
Object.setPrototypeOf(NoneImpl.prototype, General.prototype);

// Export everything properly initialized
export { General, Any, NoneImpl as None, Void };