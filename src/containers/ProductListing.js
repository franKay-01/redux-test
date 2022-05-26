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

    let kisiInfo = await kisiClient.signIn({ domain: 'test-task', email: 'testaccount+1@kisi.io', password: 'uA3JlShxKn' })
    console.log(JSON.stringify(kisiInfo))
    // .then(() => {
    //   kisiClient.get("groups").then(groups => console.log("GROUPS " + JSON.stringify(groups)))
    //   kisiClient.get("groupslocks").then(groups_locks => console.log("GROUP LOCKS " + JSON.stringify(groups_locks)))
    //   }
    // )


    const options = {
      method: 'GET',
      url: 'https://api.kisi.io/group_locks',
      params: { ids: '1', limit: '10', offset: '0' },
      headers: { 'Access-Control-Allow-Origin': "*",'Content-Type': 'application/json', Authorization: kisiClient.authenticationToken }
    };


    axios.request(options).then(function (response) {
      console.log("LOCKS "+response.data);
    }).catch(function (error) {
      console.error(error);
    });

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
