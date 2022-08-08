import React, {useEffect} from 'react';
import {booleanType, hashValues, numberType, route} from "react-router-typesafe-routes/dom";

// React-Router-Typesafe-Routes
export const ROUTES = {
    PRODUCT: route(
        "product/:id",
        {
            params: {id: numberType},
            searchParams: {sectionsCount: numberType},
            hash: hashValues("about", "more"),
            state: {fromProductList: booleanType},
        },
        {
            DETAILS: route(
                "details", {}, {
                    USERS: route(
                        "users"
                    )
                }
            )
        }
    ),
};

function App() {
    // React-Router-Typesafe-Routes
    useEffect(() => {
        // /product/:id
        console.log(ROUTES.PRODUCT.path)
        // /product/:id/details
        console.log(ROUTES.PRODUCT.DETAILS.path)
        // /product/:id/details/users
        console.log(ROUTES.PRODUCT.DETAILS.USERS.path)

        // /product/45
        console.log(ROUTES.PRODUCT.buildUrl({id: 45}))
        // /product/45?sectionsCount=5
        console.log(ROUTES.PRODUCT.buildUrl({id: 45}, {sectionsCount: 5}))
        // /product/45?sectionsCount=5#more
        console.log(ROUTES.PRODUCT.buildUrl({id: 45}, {sectionsCount: 5}, "more"))
        // /product/45/details/users?sectionsCount=5#about
        console.log(ROUTES.PRODUCT.DETAILS.USERS.buildUrl({id: 45}, {sectionsCount: 5}, "about"))
    }, [])

    return (
        <div className="App">
            Hello
        </div>
    );
}

export default App;
