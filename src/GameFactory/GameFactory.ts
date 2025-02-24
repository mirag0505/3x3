// SimpleGameFactory.ts
import { GameState } from "../GameState/GameState";
import { Dashboard } from "../Dashboard/Dashboard";
import { UserInterface } from "../UserInterface/UserInterface";
import { GameLogic } from "../GameLogic/GameLogic";

export class GameFactory {
  public createGame() {
    const state = new GameState();
    const dashboard = new Dashboard(8, 8);

    const grid = dashboard.getGrid(); // или new SimpleGrid(8,8)

    const ui = new UserInterface();
    const logic = new GameLogic(dashboard.getGrid());

    return {
      state,
      dashboard,
      ui,
      logic,
    };
  }
}
