"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("next-auth/react");
var router_1 = require("next/router");
var AuthWrapper = function (_a) {
    var children = _a.children;
    var _b = (0, react_2.useSession)(), session = _b.data, status = _b.status;
    var loading = status === 'loading';
    var router = (0, router_1.useRouter)();
    (0, react_1.useEffect)(function () {
        if (!loading && !session) {
            // User is not authenticated, redirect to login page
            router.push('/pages/login');
        }
    }, [loading, session, router]);
    if (loading) {
        // Render loading state if session data is still loading
        return React.createElement("div", null, "Loading...");
    }
    // User is authenticated, render the protected page
    return React.createElement(React.Fragment, null, children);
};
exports["default"] = AuthWrapper;
