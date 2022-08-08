import React, {useEffect} from 'react';
import {booleanType, hashValues, numberType, route} from "react-router-typesafe-routes/dom";
import { route as tRoute, stringParser } from "typesafe-routes";

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
            ),
        }
    ),
};


export const addressRoute = tRoute("address", {}, {})
export const detailsRoute = tRoute("/details", {}, {addressRoute})
export const accountRoute = tRoute("/account/:accountId", {
    accountId: stringParser
}, {detailsRoute, addressRoute});

function App() {
    // React-Router-Typesafe-Routes
    useEffect(() => {
        console.log("==========  RRTR ==========")

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

    // Typesafe Routes
    useEffect(() => {
        console.log("===========  TR ===========")

        console.log(accountRoute.template)
        console.log(accountRoute({accountId: "sdsd45Trd3"}).$)
        console.log(accountRoute({accountId: "34jlksdj"}).detailsRoute({}).$)
        console.log(accountRoute({accountId: "swdsd8"}).addressRoute({}).$)
        console.log(detailsRoute({}).$)
        console.log(detailsRoute({}).addressRoute({}).$)
        console.log(addressRoute({}).$)

        console.log(accountRoute.parseParams({accountId: "sd78"}))
    }, [])

    return (
        <div className="App">
            Hello
        </div>
    );
}

export default App;
