export interface ISucessfullLoginResponse {
  code: 201;
  data: {
    token: string;
    message: string;
  };
  message: string;
}
