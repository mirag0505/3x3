import { AbstractUserInterface } from "./AbstractUserInterface";
import { Input } from "./Input";
import { Output } from "./Output";

export class UserInterface extends AbstractUserInterface {
  private input: Input;
  private output: Output;

  constructor() {
    super();
    this.input = new Input();
    this.output = new Output();
  }

  public renderOutput(output: string): void {
    // Вызываем метод из Output
    this.output.outputRenderer(output);
  }

  public getInput(): string {
    // Берём строку у Input
    return this.input.getUserInput("> ");
  }
}