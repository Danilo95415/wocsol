"use strict";
exports.__esModule = true;
// ** MUI Imports
var Grid_1 = require("@mui/material/Grid");
// ** Icons Imports
// ** Custom Components Imports
// ** Styled Component Import
var react_apexcharts_1 = require("src/@core/styles/libs/react-apexcharts");
// ** Demo Components Imports
//my imports
var ContactUs_1 = require("src/views/wocsolbasics/ContactUs");
var Support = function () {
    return (React.createElement(react_apexcharts_1["default"], null,
        React.createElement(Grid_1["default"], { container: true, spacing: 6 },
            React.createElement(Grid_1["default"], { item: true, xs: 12, md: 12, sm: 12 },
                React.createElement("h1", null, "WOCSOL Support")),
            React.createElement(Grid_1["default"], { item: true, xs: 12, md: 12, sm: 12 },
                React.createElement(ContactUs_1["default"], null)))));
};
exports["default"] = Support;
