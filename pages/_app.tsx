import "@mantine/core/styles.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/app/store";
import { Provider as ReduxProvidor } from "react-redux";
import "@mantine/carousel/styles.css";
import "./OrderForm.scss";
import "./HtmlTextWrapper.scss";
import "./ProductPage.scss";
import "./carousel.scss";
import "./Thankyou.scss";
import "./main.scss";
import Home from ".";

export default  function App() {
    return (
        <MantineProvider theme={theme}>
            <ReduxProvidor store={store}>
                <PersistGate persistor={persistor}>
                    <BrowserRouter>
                        {" "}
                        <Head>
                            <script
                                dangerouslySetInnerHTML={{
                                    __html: ` //Part1
                                            !(function (w, d, t) {
                                                w.TiktokAnalyticsObject = t;
                                                var ttq = (w[t] = w[t] || []);
                                                (ttq.methods = [
                                                    "page",
                                                    "track",
                                                    "identify",
                                                    "instances",
                                                    "debug",
                                                    "on",
                                                    "off",
                                                    "once",
                                                    "ready",
                                                    "alias",
                                                    "group",
                                                    "enableCookie",
                                                    "disableCookie",
                                                ]),
                                                    (ttq.setAndDefer = function (t, e) {
                                                        t[e] = function () {
                                                            t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
                                                        };
                                                    });
                                                for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
                                                (ttq.instance = function (t) {
                                                    for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]);
                                                    return e;
                                                }),
                                                    (ttq.load = function (e, n) {
                                                        var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
                                                        (ttq._i = ttq._i || {}),
                                                            (ttq._i[e] = []),
                                                            (ttq._i[e]._u = i),
                                                            (ttq._t = ttq._t || {}),
                                                            (ttq._t[e] = +new Date()),
                                                            (ttq._o = ttq._o || {}),
                                                            (ttq._o[e] = n || {});
                                                        var o = document.createElement("script");
                                                        (o.type = "text/javascript"), (o.async = !0), (o.src = i + "?sdkid=" + e + "&lib=" + t);
                                                        var a = document.getElementsByTagName("script")[0];
                                                        a.parentNode.insertBefore(o, a);
                                                    });
                                            })(window, document, "ttq");`,
                                }}
                            ></script>

                            <script
                                dangerouslySetInnerHTML={{
                                    __html: ` !(function (f, b, e, v, n, t, s) {
                                                if (f.fbq) return;
                                                n = f.fbq = function () {
                                                    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
                                                };
                                                if (!f._fbq) f._fbq = n;
                                                n.push = n;
                                                n.loaded = !0;
                                                n.version = "2.0";
                                                n.queue = [];
                                                t = b.createElement(e);
                                                t.async = !0;
                                                t.src = v;
                                                s = b.getElementsByTagName(e)[0];
                                                s.parentNode.insertBefore(t, s);
                                                })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");`,
                                }}
                            ></script>
                            <title>Mantine Template</title>
                            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
                            <link rel="shortcut icon" href="/favicon.svg" />
                        </Head>
                        <Home/>
                    </BrowserRouter>
                </PersistGate>
            </ReduxProvidor>
        </MantineProvider>
    );
}
