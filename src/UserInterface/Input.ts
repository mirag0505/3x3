import { AbstractInput } from "./AbstractInput";
import promptSync from "prompt-sync";

export class Input extends AbstractInput {
    // Поле, в котором хранится функция prompt, возвращаемая библиотекой prompt-sync
    private prompt = promptSync();
  
    constructor() {
      super();
    }
  
    /**
     * Запрашивает у пользователя ввод в консоли с помощью prompt-sync.
     * @param promptMessage Сообщение-приглашение для ввода
     * @returns Строка, которую пользователь ввёл
     */
    public getUserInput(promptMessage: string): string {
      const userInput = this.prompt(promptMessage);
      return userInput;
    }
  
    /**
     * Обработчик уже введённой строки (простой пример).
     * @param str Строка, введённая пользователем
     */
    public inputHandler(str: string): void {
      // Здесь можно, например, сделать валидацию или запустить другую логику
      console.log(`Обработка введённой строки: "${str}"`);
      // Например, если нужно сохранить её в БД, провести парсинг и т.д.
    }
  }