export interface ICategory {
  id: number;
  name: string;
}

export interface ICategoriesSucessfullResponse {
  code: 200;
  data: ICategory[];
  message: "Success";
}
