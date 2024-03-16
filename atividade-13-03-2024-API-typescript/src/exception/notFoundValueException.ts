export class NotFoundValueException extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = "NotFoundValueException";
  }
}

