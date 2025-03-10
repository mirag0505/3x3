/**
 * Класс для отслеживания статистики игры
 */
export class Statistics {
  private stepsCount: number = 0;
  private score: number = 0;
  private history: string[] = [];

  /**
   * Создает новый экземпляр статистики
   */
  constructor() {
    this.stepsCount = 0;
    this.score = 0;
    this.history = [];
  }

  /**
   * Добавляет шаг в историю
   * @param action Описание действия
   */
  public addStep(action: string): void {
    this.history.push(`Шаг ${this.stepsCount + 1}: ${action}`);
    this.stepsCount++;
  }

  /**
   * Обновляет количество очков
   * @param points Количество очков для добавления
   */
  public updateScore(points: number): void {
    if (points < 0) {
      throw new Error("Количество очков не может быть отрицательным");
    }
    this.score += points;
  }

  /**
   * Возвращает форматированную статистику для вывода
   * @returns Строка с форматированной статистикой
   */
  public getFormattedStats(): string {
    let result = `Итоговая статистика:\n`;
    result += `Количество очков: ${this.score}\n`;
    result += `Количество ходов: ${this.stepsCount}\n`;
    
    if (this.history.length > 0) {
      result += `\nИстория ходов:\n`;
      // Показываем последние 10 ходов для краткости
      const recentHistory = this.history.slice(-10);
      result += recentHistory.join('\n');
      
      if (this.history.length > 10) {
        result += `\n... и еще ${this.history.length - 10} ходов`;
      }
    }
    
    return result;
  }

  /**
   * Возвращает количество сделанных шагов
   * @returns Количество шагов
   */
  public getStepsCount(): number {
    return this.stepsCount;
  }

  /**
   * Возвращает текущее количество очков
   * @returns Количество очков
   */
  public getScore(): number {
    return this.score;
  }

  /**
   * Возвращает историю ходов
   * @returns Массив с историей ходов
   */
  public getHistory(): string[] {
    return [...this.history]; // Возвращаем копию массива
  }

  /**
   * Сбрасывает статистику
   */
  public reset(): void {
    this.stepsCount = 0;
    this.score = 0;
    this.history = [];
  }
}