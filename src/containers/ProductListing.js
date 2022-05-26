import React, { useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setUser } from "../redux/actions/productsActions";
import ProductComponent from "./ProductComponent";
import Kisi from "kisi-client"

const ProductPage = () => {
  const products = useSelector((state) => state.allProducts.products);
  const user = useSelector((state) => state.userInfo.user);

  console.log(`USER ${user}`)
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    const response = await axios
      .get("https://fakestoreapi.com/products")
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(setProducts(response.data));
  };

  const loginUser = async () => {
    const kisiClient = new Kisi()

    kisiClient.signIn({ domain: 'test-task', email: 'testaccount+1@kisi.io', password: 'uA3JlShxKn' }).then((info) => {
      console.log( `INFO FROM KISI ${JSON.stringify(info)}`)
      kisiClient.get("groups").then(groups => console.log('GROUPS '+ JSON.stringify(groups)))

      // kisiClient.post("groups", {
      //   "group_lock": {
      //     "group_id": 0,
      //     "lock_id": 0
      //   }
      // }).then(groups => console.log('GROUPS '+ JSON.stringify(groups)))
      
    })
    // dispatch(setUser(kisiInfo));
  }

  useEffect(() => {
    loginUser();
    fetchProducts();
  }, []);

  console.log("Products :", products);
  return (
    <div className="ui grid container">
      <ProductComponent />
    </div>
  );
};

export default ProductPage;
