// enums
import appDetails from "@/app/enum/appDetails";
// import roleType from "@/app/enum/roleType";
import uploadType from "@/app/enum/uploadType";

const configServer = require("@/config");
export const config = configServer;

export const APP_NAME = appDetails.APPNAME;

export const MESSAGE_NOT_ALLOWED = "Not allowed to access customer services";
export const MESSAGE_AUTH_ERROR = "Unauthorized or invalid OTP.";
export const MESSAGE_NOT_FOUND_ERROR = "Not found. Please try after sometime.";
export const MESSAGE_DB_ERROR = "Something went wrong while processing data.";
export const MESSAGE_APP_ERROR = "Something went wrong while processing data.";

// Response Messages

export const RESPONSE_MESSAGES = {
    CODE_400: "Auth Token is required. Please provide a valid auth token along with request.",
    CODE_401: "You need to login to view this",
    CODE_403: "You are forbidden from seeing this",
    CODE_404: "The resource referenced by request does not exists.",
    CODE_405: "Requested method is not valid",
    CODE_408: "Request getting too much time. please try after some time",
    CODE_500: "Something went wrong on server. Please contact server admin.",
    CODE_501: "We will patch no such thing",
    CODE_503: "Requested service is unavailable for this time",
    CODE_200: "Success",
    CODE_201: "Created",
    CODE_422: "Something went wrong, Database error",
};

export const CUSTOM_RESPONSE_MESSAGES = {
    USER_RES: "Custom Response message will come here"
}