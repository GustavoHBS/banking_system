export class ServerError {
  public readonly message: string;
  constructor(message: string, err: any) {
    this.message = message;
  }
}
