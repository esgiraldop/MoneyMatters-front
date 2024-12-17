import { privateAxiosInstance } from "../config/axios.config";
import { ICategoriesSucessfullResponse } from "../interfaces/Category.interface";
import { handleAxiosResponse } from "../utilities/handle-axios-response.utility";

export type IHandleError = (
  isErrorModalOpen: boolean,
  errorLoading: boolean
) => void;

export class CategoriesService {
  static resource = "categories";

  static async getAll(
    params: Record<string, string>
  ): Promise<ICategoriesSucessfullResponse | null> {
    return handleAxiosResponse<ICategoriesSucessfullResponse>(async () => {
      return await privateAxiosInstance.get<ICategoriesSucessfullResponse>(
        `${this.resource}`,
        { params }
      );
    });
  }
}
