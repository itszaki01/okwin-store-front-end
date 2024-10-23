import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppShell from "./AppShell";
import MyLoader from "../components/common/MyLoader/MyLoader";
import Checkout from "../screens/Checkout/Checkout";
import Category from "../screens/Category/Category";
const Product = lazy(() => import("../screens/Product/Product"));
const HomePage = lazy(() => import("../screens/Home/HomePage"));
const Thankyou = lazy(() => import("../screens/Thankyou/Thankyou"));
const Page = lazy(() => import("../screens/Page/Page"));

export default function AppRouter() {

    return (
        <Routes>
            {/* ADMIN PANEL ROUTES */}
            <Route path="/" element={<AppShell />}>
                <Route
                    index
                    element={
                        <Suspense fallback={<MyLoader />}>
                            <HomePage />
                        </Suspense>
                    }
                />
                <Route
                    path="/p/:productSlug"
                    element={
                        <Suspense fallback={<MyLoader />}>
                            <Product />
                        </Suspense>
                    }
                />
                <Route
                    path="/thankyou"
                    element={
                        <Suspense fallback={<MyLoader />}>
                            <Thankyou />
                        </Suspense>
                    }
                />
                <Route
                    path="/page/:pageSlug"
                    element={
                        <Suspense fallback={<MyLoader />}>
                            <Page />
                        </Suspense>
                    }
                />
                <Route
                    path="/category/:categorySlug"
                    element={
                        <Suspense fallback={<MyLoader />}>
                            <Category />
                        </Suspense>
                    }
                />
                <Route
                    path="/checkout"
                    element={
                        <Suspense fallback={<MyLoader />}>
                            <Checkout />
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    );
}
