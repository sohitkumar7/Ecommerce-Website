import React, { useEffect, useState } from "react";
import ProductFilter from "../../components/shopping-view/Filter";
import {DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuItem,DropdownMenuRadioItem,DropdownMenuRadioGroup,} from ".././../components/ui/dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { sortOptions } from "../../config/index";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilterProducts } from "../../store/shop/product-slice";
import ShoppingProductTile from "../../components/shopping-view/Product-tile";
import {useSearchParams} from "react-router-dom"

function Shoppinglisting() {
  // feetch list of product
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopProducts);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams,setSearchParams] = useSearchParams()
  function handleSort(value) {
    console.log(value);
    setSort(value);
  }

  function handleFilter(getSectionId, getCurrentOptions) {
    // console.log(getSectionId, "getSectionoid")
    // console.log(getCurrentOptions,"getcurrentoptions")

    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOptions],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOptions);
      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOptions);
      else {
        cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }
    // console.log(cpyFilters);
    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {}, [filters]);

  useEffect(() => {
    dispatch(fetchAllFilterProducts());
  }, [dispatch]);

  // console.log(filters,"filters");

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b  flex items-center justify-between">
          <h2 className="text-lg font-extrabold mr-2"> All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList?.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  varient="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile
                  // handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  // handleAddtoCart={handleAddtoCart}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default Shoppinglisting;
