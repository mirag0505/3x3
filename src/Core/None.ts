/**
 * Класс None служит для замыкания иерархии снизу.
 * Представляет собой "пустую ссылку", аналог null/undefined,
 * но остающийся в рамках объектной системы типов.
 * 
 * Реализован как синглтон, так как TypeScript не поддерживает
 * множественное наследование.
 */

// Remove all imports at the top
// We'll use a different approach to avoid circular dependencies

// Define a placeholder for the None class that doesn't extend anything yet
class NoneImpl {
    private static instance: NoneImpl | null = null;
  
    /**
     * Приватный конструктор для предотвращения создания экземпляров
     * класса извне.
     */
    private constructor() {
      // No super() call here
    }
  
    /**
     * Получение единственного экземпляра класса None.
     * @returns Экземпляр класса None
     */
    public static getInstance(): NoneImpl {
      if (!NoneImpl.instance) {
        NoneImpl.instance = new NoneImpl();
      }
      return NoneImpl.instance;
    }
  
    /**
     * Переопределение метода toString для None.
     * @returns Строковое представление None
     */
    public toString(): string {
      return "<None>";
    }
  
    /**
     * Проверяет, является ли объект экземпляром None.
     * @param obj Объект для проверки
     * @returns true, если объект является экземпляром None, иначе false
     */
    public static isNone(obj: any): boolean {
      return obj === NoneImpl.getInstance();
    }
  }
  
  // Export a placeholder for now
  export const None = NoneImpl;
  export const Void = NoneImpl.getInstance();
  
  // We'll properly set up the inheritance in a separate initialization file