import { useCallback, useState } from "react";
import { ICategory } from "../interfaces/Category.interface";
import { useFocusEffect } from "@react-navigation/native";
import { CategoriesService } from "../services/categories.service";

export function useCategories() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [errorLoadingCategories, setErrorLoadingCategories] = useState<
    boolean | null
  >(null);
  const [isCategoryLoading, setIsCategoryLoading] = useState<boolean | null>(
    null
  );

  useFocusEffect(
    useCallback(() => {
      async function getCategoriesInfo() {
        setIsCategoryLoading(true);
        const params: Record<string, string> = {};
        const CategoriesResponse = await CategoriesService.getAll(params);
        if (CategoriesResponse?.data) {
          setCategories(CategoriesResponse?.data);
          setIsCategoryLoading(false);
          setErrorLoadingCategories(false);
        } else {
          setIsCategoryLoading(false);
          setErrorLoadingCategories(true);
        }
      }

      getCategoriesInfo();
      return () => getCategoriesInfo();
    }, [])
  );

  return {
    categories,
    setCategories,
    errorLoadingCategories,
    setErrorLoadingCategories,
    isCategoryLoading,
    setIsCategoryLoading,
  };
}
