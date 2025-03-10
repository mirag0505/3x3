import { General } from './General';

/**
 * Базовый класс для всех прикладных классов в системе.
 * Наследуется от General и открыт для модификации.
 * Все новые классы, не имеющие предка в прикладной иерархии, 
 * должны наследоваться от Any.
 */
export class Any extends General {
  constructor() {
    super();
  }

  // Здесь можно добавить дополнительные методы и свойства,
  // специфичные для вашего проекта
}