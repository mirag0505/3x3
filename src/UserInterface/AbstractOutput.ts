/**
 * Абстрактный класс, описывающий вывод (Output).
 */
export abstract class AbstractOutput {
  /**
   * Конструктор Output.
   * Постусловие: создан Output.
   */
  constructor() {
    // Дополнительная инициализация при необходимости
  }

  /**
   * Предусловие: строка вывода не пустая.
   * Постусловие: строка str отображается (например, в консоли).
   * @param str - строка для отображения
   */
  public abstract outputRenderer(str: string): void;
}
