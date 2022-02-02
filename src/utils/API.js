import axios from "axios";

const getData = () => {
    const sheetURL = "https://sheets.googleapis.com/v4/spreadsheets/1ca3iMcW7bFbFIECWJFFAGIjvDtEj35rah3aj906FhHI/values:batchGet?ranges=Sheet1&ranges=Sheet2&key=AIzaSyC3uBeROIR1wKR4mJlpvy-Pink3Nv6Gu6E";

    const options = {
        method: "GET",
        url: sheetURL
    };

    return axios(options);
};

export { getData };