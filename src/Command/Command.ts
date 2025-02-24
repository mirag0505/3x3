import { AbstractCommand } from "./AbstaractCommand";

export class Command extends AbstractCommand {
    private message: string;
  
    constructor(message: string) {
      super();
      this.message = message;
    }
  
    public execute(): void {
      console.log(`PrintCommand: ${this.message}`);
    }
  }