export abstract class AbstractUserInterface {
    /**
     * Конструктор UserInterface.
     * Постусловие: создан UserInterface.
     */
    constructor() {
      // Дополнительная инициализация при необходимости
    }
  
    /**
     * Предусловие: output не пустой.
     * Постусловие: строка output выведена в консоль (или любым другим способом).
     * @param output - строка для вывода
     */
    public abstract renderOutput(output: string): void;
  
    /**
     * Постусловие: считывается строка ввода пользователя и возвращается.
     * @returns строка, введённая пользователем
     */
    public abstract getInput(): string;
  }
  