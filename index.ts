import { GameFactory } from "./src/GameFactory/GameFactory";

export async function main() {
  // Создаём игру через фабрику
  const gameFactory = new GameFactory();
  const { state, dashboard, ui, logic } = gameFactory.createGame();

  ui.renderOutput("Добро пожаловать в мини-игру 'Три в ряд'!\n");

  // Переходим из "Initialization" в "Menu"
  state.handleUserAction("start"); // GameState: transition to "Menu"

  let isRunning = true;

  while (isRunning) {
    ui.renderOutput(`Текущее состояние: ${state.getCurrentState()}\n`);

    // Выводим поле
    ui.renderOutput(
      "Текущее поле:\n" + dashboard.getGrid().generateGridString()
    );

    // Спросим команду пользователя
    const command = ui.getInput().trim();

    if (command === "exit") {
      // переход в состояние "GameOver" (или делаем break)
      state.handleUserAction("exit");
      isRunning = false;
      break;
    }

    // Парсим возможные команды:
    const parts = command.split(" ");
    switch (parts[0]) {
      case "swap":
        // например: "swap 0 0 0 1"
        if (parts.length === 5) {
          const x1 = parseInt(parts[1]);
          const y1 = parseInt(parts[2]);
          const x2 = parseInt(parts[3]);
          const y2 = parseInt(parts[4]);
          logic.applySwap(x1, y1, x2, y2);
          // Сразу резолвим комбинации:
          logic.resolveMatches();
        } else {
          ui.renderOutput("Формат команды swap: swap x1 y1 x2 y2");
        }
        break;

      case "bonus":
        // "bonus x y"
        if (parts.length === 3) {
          const x = parseInt(parts[1]);
          const y = parseInt(parts[2]);
          logic.activateBonus(x, y);
        } else {
          ui.renderOutput("Формат команды bonus: bonus x y");
        }
        break;

      case "play":
        state.handleUserAction("play");
        break;

      default:
        ui.renderOutput(
          "Неизвестная команда. Доступны: swap, bonus, exit, play"
        );
        break;
    }

    // Можем проверить конец игры
    logic.checkGameOver();
  }

  ui.renderOutput("Игра завершена.\n");
}

main();