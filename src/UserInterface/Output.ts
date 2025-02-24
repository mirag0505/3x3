import { AbstractOutput } from "./AbstractOutput";

export class Output extends AbstractOutput {
  constructor() {
    super();
  }

  public outputRenderer(str: string): void {
    console.log(str);
  }
}