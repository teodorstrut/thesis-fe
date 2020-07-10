export class FileViewModel {
  type: string;
  data: string;
  name: string;

  public constructor(name: string, type: string, data: string) {
    this.name = name;
    this.type = type;
    this.data = data;
  }
}
