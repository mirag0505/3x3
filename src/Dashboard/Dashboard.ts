import {
  AbstractCell,
  AbstractGrid,
  AbstractDashboard,
} from "./AbstractDashboaed";

export class Cell extends AbstractCell {
  constructor(type: string = "empty") {
    // Вызываем абстрактный конструктор
    super(type);
  }

  public activateBonus(): void {
    if (this.type === "bonus") {
      console.log("Bonus activated! 🚀");
      // Логика применения бонуса (увеличение очков, удаление ряда и т.д.)
    } else {
      console.warn("Попытка активировать бонус на не-бонусной ячейке");
    }
  }

  public getStatus(): string {
    return this.type;
  }
}

export class Grid extends AbstractGrid {
  private cells: Cell[][];

  constructor(private width: number, private height: number) {
    super();
    // Создаём матрицу ячеек
    this.cells = [];
    for (let y = 0; y < height; y++) {
      const row: Cell[] = [];
      for (let x = 0; x < width; x++) {
        // По умолчанию пусть все будут "empty"
        row.push(new Cell("empty"));
      }
      this.cells.push(row);
    }
  }

  public swapCells(x1: number, y1: number, x2: number, y2: number): void {
    // Предусловие: ячейки должны существовать
    if (!this.isValidCoord(x1, y1) || !this.isValidCoord(x2, y2)) return;

    const temp = this.cells[y1][x1];
    this.cells[y1][x1] = this.cells[y2][x2];
    this.cells[y2][x2] = temp;
  }

  public fillEmptyCells(): void {
    // Допустим, мы делаем все ячейки "empty".
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.cells[y][x] = new Cell("empty");
      }
    }
  }

  public fillFullCells(): void {
    // Список возможных типов (например, 5 символов).
    const possibleTypes = ["A", "B", "C", "D", "E"];

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.cells[y][x].getStatus() === "empty") {
          // 10% шанс, что ячейка будет "bonus", иначе — случайный символ.
          const rand = Math.random();
          if (rand < 0.1) {
            this.cells[y][x] = new Cell("БАМ");
          } else {
            const randomIndex = Math.floor(
              Math.random() * possibleTypes.length
            );
            const randomSymbol = possibleTypes[randomIndex];
            this.cells[y][x] = new Cell(randomSymbol);
          }
        }
      }
    }
  }

  public generateGridString(): string {
    // Шапка: отступ и номера столбцов
    let result = "     ";
    for (let x = 0; x < this.width; x++) {
      result += `  ${x}  `;
    }
    result += "\n";

    // Линия под шапкой (можно повторять после каждой строки)
    result += "    " + "+-----".repeat(this.width) + "+\n";

    // Перебираем строки (y)
    for (let y = 0; y < this.height; y++) {
      // Вывод индекса строки слева
      result += `${y.toString().padStart(3, " ")} | `;

      // Перебираем столбцы (x)
      for (let x = 0; x < this.width; x++) {
        const item = this.cells[y][x].getStatus();
        // Вывод содержимого ячейки (item)
        // Вы можете дополнительно выравнивать item, если символ может быть шире 1
        result += `${item}`.padEnd(4, " ") + "| ";
      }
      result += "\n";
      result += "    " + "+-----".repeat(this.width) + "+\n";
    }

    return result;
  }

  public findMatches(): string[] {
    // Упрощённая логика: ищем подряд идущие одинаковые типы по строкам
    const matches: string[] = [];
    for (let y = 0; y < this.height; y++) {
      let runType = this.cells[y][0].getStatus();
      let runCount = 1;
      for (let x = 1; x < this.width; x++) {
        const currentType = this.cells[y][x].getStatus();
        if (currentType === runType && currentType !== "empty") {
          runCount++;
        } else {
          // Если предыдущая цепочка была > 1, добавим в список
          if (runCount > 1 && runType !== "empty") {
            matches.push(`Row ${y}, type=${runType}, length=${runCount}`);
          }
          runType = currentType;
          runCount = 1;
        }
      }
      // Конец строки
      if (runCount > 1 && runType !== "empty") {
        matches.push(`Row ${y}, type=${runType}, length=${runCount}`);
      }
    }
    return matches;
  }

  public isValidCoord(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  public removeMatches(matchCoords: string[]): void {
    for (const [x, y] of matchCoords) {
      // Проверим валидность координат (например, не выходит ли за границы)
      if (this.isValidCoord(+x, +y)) {
        // Помечаем ячейку как пустую
        this.cells[+y][+x] = new Cell("empty");
        console.log('добавили пустую ячейку')
      }
    }
  }

  public getCell(x: number, y: number): Cell | null {
    if (!this.isValidCoord(x, y)) return null;
    return this.cells[y][x];
  }
}

export class Dashboard extends AbstractDashboard {
  private grid: Grid;

  constructor(width: number, height: number) {
    super();
    // Постусловие: создаём новый Grid
    this.grid = new Grid(width, height);
    // Можно сразу заполнить какими-то значениями
    this.grid.fillFullCells();
  }

  public updateGridAfterAction(): void {
    // Пример: пускай при каждом вызове «сбрасываем» часть ячеек в empty и снова заполняем
    this.grid.fillEmptyCells();
    this.grid.fillFullCells();
    console.log("Grid was updated after action");
  }

  public getGrid(): Grid {
    return this.grid;
  }
}
