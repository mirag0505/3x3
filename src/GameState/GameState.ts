import { AbstractGameState } from "./AbstractGameState";

export enum GameStatus {
  Init = 'init',
  Menu = 'menu',
  Playing = 'playing',
  GameOver = 'gameOver',
}

export class GameState extends AbstractGameState {
  private currentState: GameStatus;

  // Возможные переходы (можно хранить в объекте или карте)
  // Ключ: текущее состояние, Значение: список разрешённых состояний.
  private validTransitions: Record<GameStatus, GameStatus[]> = {
    [GameStatus.Init]: [GameStatus.Menu],         // Из "Init" можно только в "Menu"
    [GameStatus.Menu]: [GameStatus.Playing],      // Из "Menu" — только в "Playing"
    [GameStatus.Playing]: [GameStatus.Menu, GameStatus.GameOver], // Во время игры можно вернуться в меню или перейти к концу
    [GameStatus.GameOver]: [],                    // Из "GameOver" переходов нет
  };

  constructor() {
    super();
    // Начинаем с состояния "Init"
    this.currentState = GameStatus.Init;
  }

  public transitionTo(state: string): void {
    // Проверяем, является ли строка допустимым состоянием
    if (!Object.values(GameStatus).includes(state as GameStatus)) {
      console.warn(`Недопустимое состояние: ${state}`);
      return;
    }

    const targetState = state as GameStatus;
    // Проверяем, допустим ли переход
    if (this.canTransition(this.currentState, targetState)) {
      this.currentState = targetState;
      console.log(`Переход к состоянию: ${this.currentState}`);
    } else {
      console.warn(`Переход из '${this.currentState}' в '${state}' запрещён!`);
    }
  }

  public handleUserAction(action: string): void {
    // В зависимости от текущего состояния и действия —
    // решаем, какое следующее состояние выбрать (или не меняем вовсе).

    switch (this.currentState) {
      case GameStatus.Init:
        if (action === 'start') {
          this.transitionTo(GameStatus.Menu);
        } else {
          console.warn('В Init доступно только действие start => Menu');
        }
        break;

      case GameStatus.Menu:
        if (action === 'play') {
          this.transitionTo(GameStatus.Playing);
        } else {
          console.warn('В Menu доступно только действие play => Playing');
        }
        break;

      case GameStatus.Playing:
        if (action === 'stop') {
          // например, вернёмся в меню
          this.transitionTo(GameStatus.Menu);
        } else if (action === 'end') {
          this.transitionTo(GameStatus.GameOver);
        } else {
          console.warn('В Playing доступны действия stop => Menu, end => GameOver');
        }
        break;

      case GameStatus.GameOver:
        console.warn('Игра завершена. Переходы невозможны.');
        break;

      default:
        console.warn(`Необработанное состояние: ${this.currentState}`);
        break;
    }
  }

  public getCurrentState(): string {
    return this.currentState;
  }

  // Вспомогательный метод для проверки допустимости перехода
  private canTransition(from: GameStatus, to: GameStatus): boolean {
    const allowed = this.validTransitions[from];
    return allowed.includes(to);
  }
}
