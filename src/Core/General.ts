import { None, Void } from './None';
/**
 * Базовый абстрактный класс для всех объектов в системе.
 * Содержит фундаментальный набор операций, общих для всех классов.
 */
export abstract class General {
  // Константы статусов копирования
  public static readonly COPY_NIL = 0;       // copy_to() еще не вызывался
  public static readonly COPY_OK = 1;        // последний вызов copy_to() успешно завершен
  public static readonly COPY_ATTR_ERR = 2;  // другой объект не имеет атрибута, копируемого из этого объекта

  private _copyStatus: number = General.COPY_NIL;

  /**
   * Глубокое копирование атрибутов текущего объекта в другой существующий объект.
   * Игнорирует атрибуты статуса.
   * @param target Целевой объект для копирования
   */
  public copyTo(target: any): void {
    try {
      // Получаем все свойства объекта, кроме статусных полей
      const properties = Object.getOwnPropertyNames(this)
        .filter(prop => !prop.endsWith('Status') && !prop.startsWith('_'));

      // Проверяем, что все свойства существуют в целевом объекте
      const hasAllProperties = properties.every(prop => prop in target);
      if (!hasAllProperties) {
        this._copyStatus = General.COPY_ATTR_ERR;
        return;
      }

      // Копируем каждое свойство
      for (const prop of properties) {
        (target as Record<string, any>)[prop] = this.deepCopy((this as Record<string, any>)[prop]);
      }

      this._copyStatus = General.COPY_OK;
    } catch (error) {
      this._copyStatus = General.COPY_ATTR_ERR;
      console.error("Ошибка при копировании:", error);
    }
  }

  /**
   * Создает и возвращает глубокую копию текущего объекта.
   * @returns Новый объект - клон текущего
   */
  public clone<T>(): T {
    return this.deepCopy(this) as T;
  }

  /**
   * Сравнивает текущий объект с другим объектом.
   * @param other Объект для сравнения
   * @returns true, если объекты равны, иначе false
   */
  public equals(other: any): boolean {
    if (this === other) return true;
    if (other === null || !(other instanceof General)) return false;

    // Сравниваем все свойства объектов
    const thisProps = Object.getOwnPropertyNames(this);
    const otherProps = Object.getOwnPropertyNames(other);

    if (thisProps.length !== otherProps.length) return false;

    for (const prop of thisProps) {
      if (!this.deepEquals((this as Record<string, any>)[prop], (other as Record<string, any>)[prop])) {
        return false;
      }
    }

    return true;
  }

  /**
   * Сериализует объект в строку JSON.
   * @returns Строка JSON, представляющая объект
   */
  public serialize(): string {
    return JSON.stringify(this);
  }

  /**
   * Десериализует строку JSON в объект.
   * @param json Строка JSON для десериализации
   * @returns Десериализованный объект
   */
  public static deserialize<T>(json: string): T {
    return JSON.parse(json) as T;
  }

  /**
   * Возвращает строковое представление объекта.
   * @returns Строковое представление
   */
  public toString(): string {
    return `<"${this.constructor.name}" instance (id=${this.getObjectId()})>`;
  }

  /**
   * Проверяет, является ли объект экземпляром указанного типа.
   * @param type Тип для проверки
   * @returns true, если объект является экземпляром указанного типа, иначе false
   */
  public isInstanceOf(type: any): boolean {
    return this instanceof type;
  }

  /**
   * Возвращает реальный тип объекта.
   * @returns Конструктор класса объекта
   */
  public getType(): any {
    return this.constructor;
  }

  /**
   * Возвращает статус последнего вызова copyTo().
   * @returns Статус копирования (одна из констант COPY_*)
   */
  public getCopyStatus(): number {
    return this._copyStatus;
  }

  /**
   * Возвращает уникальный идентификатор объекта.
   * @returns Строковый идентификатор
   */
  private getObjectId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  /**
   * Вспомогательный метод для глубокого копирования значения.
   * @param value Значение для копирования
   * @returns Глубокая копия значения
   */
  /**
   * Проверяет, является ли объект "пустым" (None).
   * @returns true, если объект является экземпляром None, иначе false
   */
  // At the top of General.ts, replace any imports of None with:
  
  // Import None dynamically when needed
  public isNone(): boolean {
    // Using the already imported None class instead of require
    return None.isNone(this);
  }

  private deepCopy(value: any): any {
    if (None.isNone(value)) {
      return Void;
    }

    if (value === null || typeof value !== 'object') {
      return value;
    }

    if (Array.isArray(value)) {
      return value.map(item => this.deepCopy(item));
    }

    if (value instanceof Date) {
      return new Date(value.getTime());
    }

    if (value instanceof General) {
      const copy = Object.create(Object.getPrototypeOf(value));
      value.copyTo(copy);
      return copy;
    }

    const copy = {};
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        (copy as Record<string, any>)[key] = this.deepCopy(value[key]);
      }
    }
    return copy;
  }

  /**
   * Вспомогательный метод для глубокого сравнения значений.
   * @param a Первое значение
   * @param b Второе значение
   * @returns true, если значения равны, иначе false
   */
  private deepEquals(a: any, b: any): boolean {
    if (None.isNone(a) && None.isNone(b)) {
      return true;
    }
    
    if (None.isNone(a) || None.isNone(b)) {
      return false;
    }

    if (a === b) return true;
    
    if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') {
      return a === b;
    }

    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!this.deepEquals(a[i], b[i])) return false;
      }
      return true;
    }

    if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime();
    }

    if (a instanceof General && b instanceof General) {
      return a.equals(b);
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (!keysB.includes(key) || !this.deepEquals(a[key], b[key])) {
        return false;
      }
    }

    return true;
  }
}