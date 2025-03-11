/**
 * Абстрактный класс для отслеживания статистики игры
 */
export abstract class AbstractStatistics {
  /**
   * Создает новый экземпляр статистики
   */
  constructor() {
    // Дополнительная инициализация при необходимости
  }

  /**
   * Добавляет шаг в историю
   * @param action Описание действия
   */
  public abstract addStep(action: string): void;

  /**
   * Обновляет количество очков
   * @param points Количество очков для добавления
   */
  public abstract updateScore(points: number): void;

  /**
   * Возвращает форматированную статистику для вывода
   * @returns Строка с форматированной статистикой
   */
  public abstract getFormattedStats(): string;

  /**
   * Возвращает количество сделанных шагов
   * @returns Количество шагов
   */
  public abstract getStepsCount(): number;

  /**
   * Возвращает текущее количество очков
   * @returns Количество очков
   */
  public abstract getScore(): number;

  /**
   * Возвращает историю ходов
   * @returns Массив с историей ходов
   */
  public abstract getHistory(): string[];
}