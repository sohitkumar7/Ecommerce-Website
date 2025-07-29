import React, { useEffect, useState } from "react";
import ProductFilter from "../../components/shopping-view/Filter";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
} from ".././../components/ui/dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { sortOptions } from "../../config/index";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilterProducts,
  fetchProductDetails,
} from "../../store/shop/product-slice";
import ShoppingProductTile from "../../components/shopping-view/Product-tile";
import { createSearchParams, useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "../../components/shopping-view/productDetails";
import { addToCart, fetchCartItems } from "../../store/shop/cart-slice";
import toast from "react-hot-toast";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key} = ${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("& ");
}

function Shoppinglisting() {

  const dispatch = useDispatch();
  const { productList, productDetail } = useSelector(
    (state) => state.shopProducts
  );
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const categorySearchParams = searchParams.get("category");
  const {cartItems} = useSelector((state)=>state.shopCart)
  function handleSort(value) {
    console.log(value);
    setSort(value);
  }

  function handleFilter(getSectionId, getCurrentOptions) {
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

    setFilters(cpyFilters);
    sessionStorage.setItem("filter", JSON.stringify(cpyFilters));
  }

  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddToCart(getCurrentProductId,getToatalStock) {
    const userId = user?._id;
    console.log(cartItems,"cartItems")
    let getCartItems = cartItems.items || []
    if(getCartItems.length){
      const indexOfCurrentItems = getCartItems.findIndex(item=>item.productId === getCurrentProductId )
      
      if(indexOfCurrentItems > -1){
        const getQuantity = getCartItems[indexOfCurrentItems].quantity;
        if(getQuantity + 1 >getToatalStock ){
          toast.error(`only ${getQuantity} quantity can be added for this item`)
          return;
        }
      }


    }
    dispatch(
      addToCart({
        userId: user?._id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems({ userId }));
        toast.success("Product is Added to Cart");
      }
    });
  }

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filter")) || {});
  }, [categorySearchParams]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilterProducts({ filtersParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (productDetail !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetail]);

  console.log(productList, "productList");

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile
                  key={productItem._id}
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  handleAddToCart={handleAddToCart}
                />
              ))
            : null}
        </div>
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetail}
      />
    </div>
  );
}

export default Shoppinglisting;
