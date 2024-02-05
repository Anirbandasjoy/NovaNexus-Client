import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import useFetchCategories from "../../../hooks/category/useFetchCategories";

type CategoriesProps = {
  handleCategoryIdSelected: (categoryId: string | undefined) => void;
};
type categoriesType = {
  _id: string;
  name: string;
  slug: string;
};

const category = [{ name: "All News" }];

const Categories = ({ handleCategoryIdSelected }: CategoriesProps) => {
  const { categories } = useFetchCategories();
  const [selected, setSelected] = useState(category[0]);

  const handleSelectCategory = (id: string) => {
    handleCategoryIdSelected(id);
  };

  return (
    <div className="  w-7/12 mb-2">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-sm tex-lg bg-white py-2 dark:bg-gray-800  dark:border dark:border-gray-700 px-2 dark:text-gray-300  text-gray-700  font-boldpy-2 pl-3 pr-10 text-left  sm:text-sm">
            <span className="block truncate text-xs">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {categories?.payload?.map((category: categoriesType) => (
                <Listbox.Option
                  onClick={() => handleSelectCategory(category?._id)}
                  key={category?._id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2  pl-10 pr-4 ${
                      active ? "bg-red-400 text-amber-900 " : "text-gray-900 "
                    }`
                  }
                  value={category}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate dark:text-gray-200 text-xs ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {category.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 dark:text-gray-200 text-gray-500  ">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default Categories;
