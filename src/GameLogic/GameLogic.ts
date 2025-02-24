import { Dashboard } from './../Dashboard/Dashboard';
import { Grid, Cell } from "../Dashboard/Dashboard";
import { AbstractGameLogic } from "./AbstractGameLogic";

export class GameLogic extends AbstractGameLogic {
  private score: number = 0;

  // Храним ссылку на Grid (поле с ячейками)
  constructor(private grid: Grid) {
    super();
  }

  public applySwap(x1: number, y1: number, x2: number, y2: number): void {
    // Предусловие: можно ли поменять эти две ячейки?
    // (Например, проверить, что они соседние, не заблокированные и т.п.)
    // Упрощённо: просто вызываем swapCells на Grid:
    console.log(`Swapping cells (${x1},${y1}) with (${x2},${y2})`);
    this.grid.swapCells(x1, y1, x2, y2);
    // После обмена, возможно, сразу проверяем, образовались ли выигрышные комбинации.
    this.resolveMatches();
  }

  public resolveMatches(): void {
    // Предусловие: в Grid должны быть "выигрышные" комбинации
    // Постусловие: удаляем их и начисляем очки

    const matches = this.grid.findMatches();
    if (matches.length > 0) {
      console.log(`Found matches: ${matches.join(", ")}`);
      this.grid.removeMatches(matches)

      // Удаляем (или очищаем) эти выигрышные ячейки
      // Допустим, каждое совпадение даёт +10 очков:
      const points = matches.length * 10;
      this.score += points;
      console.log(`+${points} points! Current score: ${this.score}`);

      // Пример упрощённого удаления: просто делаем ячейки "empty"
      // (конечно, нужно знать координаты, но в нашем Grid.findMatches() мы возвращали строки.

      // После удаления можно заполнить пустые ячейки
      this.grid.fillFullCells();
    }
  }

  public activateBonus(x: number, y: number): void {
    const cell: Cell | null = this.grid.getCell(x, y);
    if (!cell) {
      console.warn(`Cell (${x},${y}) does not exist!`);
      return;
    }
    if (cell.getStatus() === "БАМ>") {
      cell.activateBonus();
      // Допустим, за активацию бонуса сразу +5 очков:
      this.score += 5;
      console.log(`Bonus activated! Current score: ${this.score}`);
      // TODO Дополнительная логика (очистка ряда, взрыв и т.д.)
    } else {
      console.warn(`Cell (${x},${y}) is not a bonus cell.`);
    }
  }

  public checkGameOver(): void {
    // Предусловие: "нет возможных ходов"
    // Постусловие: Проверить, нужно ли завершать игру
    // Например, если findMatches() ничего не даёт, и нет возможности swap:

    // Упрощённая проверка: если findMatches() пусто, считаем, что скоро конец игры.
    const canFindMatches = this.grid.findMatches();
    if (canFindMatches.length === 0) {
      console.log("No more matches found. Game might be over.");
      // В реальном проекте ещё проверяем, можно ли сделать какой-либо swap.
      // Если нельзя, то объявляем конец:
      // this.gameOver = true;
    } else {
      console.log("There are still matches available. Keep playing!");
    }
  }
}
