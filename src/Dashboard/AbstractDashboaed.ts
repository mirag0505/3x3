import { Grid, Cell } from "./Dashboard";
/**
 * Абстрактный класс, объединяющий в себе Grid и Cell.
 */
export abstract class AbstractDashboard {
  /**
   * Конструктор Dashboard.
   * Постусловие: создано Grid с набором Cell.
   */
  constructor() {
    // Предполагаем, что конкретная реализация инициализирует Grid.
  }

  /**
   * Команда.
   * Постусловие: что-то изменилось в Grid после действия (как именно — решается в реализации).
   */
  public abstract updateGridAfterAction(): void;

  /**
   * Запрос.
   * Предусловие: экземпляр Dashboard существует.
   * Постусловие: возвращаем экземпляр Grid.
   */
  public abstract getGrid(): Grid;
}

/**
 * Абстрактный класс, описывающий игровое поле (Grid).
 */
export abstract class AbstractGrid {
  /**
   * Конструктор Grid.
   * Постусловие: создано новое поле.
   */
  constructor() {
    // Здесь конкретная реализация инициализирует структуру ячеек (Cell).
  }

  /**
   * Команда.
   * Предусловие: все указанные ячейки существуют.
   * Постусловие: ячейки (x1,y1) и (x2,y2) поменялись местами.
   */
  public abstract swapCells(
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): void;

  /**
   * Команда (вопрос целесообразности решается в реализации).
   * Предусловие: работает только при инициализации Grid.
   * Постусловие: все ячейки пустые.
   */
  public abstract fillEmptyCells(): void;

  /**
   * Команда.
   * Предусловие: у Grid есть пустые ячейки.
   * Постусловие: все пустые ячейки заполнены НЕ пустыми значениями (например, случайными).
   */
  public abstract fillFullCells(): void;

  /**
   * Команда.
   * Постусловие: получаем строку всего грида (для вывода).
   */
  public abstract generateGridString(): string;

  /**
   * Команда (или запрос — в зависимости от логики).
   * Предусловие: хотя бы две ячейки есть на поле. (Проверка соседства — на усмотрение реализации).
   * Постусловие: получаем список всех "выигрышных" комбинаций.
   */
  public abstract findMatches(): string[];
  /**
   * Команда (или запрос — в зависимости от логики).
   * Предусловие: хотя бы две ячейки есть на поле. (Проверка соседства — на усмотрение реализации).
   * Постусловие: получаем список всех "выигрышных" комбинаций.
   */

  /**
   * Предусловие: вы уже выполнили findMatches, и у вас есть координаты ячеек,
   * которые нужно очистить (превратить в "empty").
   * Постусловие: эти ячейки становятся пустыми (или удаляются).
   *
   * @param matchCoords - массив координат ячеек, которые надо "сжечь"
   */
  public abstract removeMatches(matchCoords: []): void;

  /**
   * Запрос.
   * Предусловие: ячейка (x,y) существует.
   * Постусловие: получаем экземпляр Cell.
   */
  public abstract getCell(x: number, y: number): Cell | null;

  /**
   * Запрос.
   * Предусловие: ячейка (x,y) существует.
   * Постусловие: получаем экземпляр Cell.
   */
  public abstract isValidCoord(x: number, y: number): boolean 
}

/**
 * Абстрактный класс, описывающий ячейку (Cell).
 */
export abstract class AbstractCell {
  /**
   * Конструктор Cell.
   * Постусловие: создана новая пустая или непустая клетка.
   * @param type Тип ячейки (например, "empty", "normal", "bonus" и т.п.).
   */
  constructor(protected type: string) {
    // Возможно, дополнительные поля
  }

  /**
   * Команда.
   * Предусловие: данная ячейка "бонусная".
   * Постусловие: активирован бонус.
   */
  public abstract activateBonus(): void;

  /**
   * Запрос.
   * Постусловие: получаем статус ячейки (например, "empty", "normal", "bonus").
   */
  public abstract getStatus(): string;
}
