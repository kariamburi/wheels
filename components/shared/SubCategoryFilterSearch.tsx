"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import {
  formUrlQuery,
  formUrlQuerymultiple,
  removeKeysFromQuery,
} from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
type sidebarProps = {
  category: string;
  AdsCountPerSubcategory: any;
};
const SubCategoryFilterSearch = ({
  category,
  AdsCountPerSubcategory,
}: sidebarProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();

      categoryList && setCategories(categoryList as ICategory[]);
    };

    getCategories();
  }, []);

  const onSelectCategory = (query: string) => {
    let newUrl = "";
    if (query) {
      newUrl = formUrlQuerymultiple({
        params: "",
        updates: {
          category: category.toString(),
          subcategory: query.toString(),
        },
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["subcategory"],
      });
    }

    router.push(newUrl, { scroll: false });
  };
  const [categoryOption, setcategoryOption] = useState("");
  return (
    <>
      <Select
        value={searchParams.get("subcategory") ?? "Select Category"}
        onValueChange={(value: string) => onSelectCategory(value)}
      >
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Search Category" />
        </SelectTrigger>
        <SelectContent>
          {categories &&
            categories
              .find((cat: any) => cat.name === category)
              ?.subcategory.map((sub: any, index: number) => (
                <SelectItem
                  key={index}
                  value={sub.title}
                  className="flex select-item p-regular-14"
                >
                  <div className="flex w-full gap-1 items-center">
                    {sub.title}
                    <div className="text-xs text-emerald-600">
                      |{" "}
                      {(AdsCountPerSubcategory &&
                        AdsCountPerSubcategory.find(
                          (item: { _id: string; adCount: number }) =>
                            item._id === sub.title
                        )?.adCount) ??
                        0}{" "}
                      ads
                    </div>
                  </div>
                </SelectItem>
              ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default SubCategoryFilterSearch;
