const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

import * as constant from "@/app/helpers/constant";

import LoggingService from "@/app/services/LoggingService";

class SecurityClient {

    constructor() { }

    jwtEncode(payload) {
        try {
            return jwt.sign(payload, constant.config.utils.JWT_SECRET, { expiresIn: constant.config.utils.JWT_TOKEN_EXPIRE });
        } catch (exe) {
            LoggingService.consoleLog("SECURITY", "Something went wrong", exe);
            return null;
        }
    }

    jwtDecode(token) {
        try {
            return jwt.decode(token);
        } catch (exe) {
            LoggingService.consoleLog("SECURITY", "Something went wrong", exe);
            return null;
        }
    }

    jwtVerify(token) {
        try {
            return jwt.verify(token, constant.config.utils.JWT_SECRET);
        } catch (exe) {
            LoggingService.consoleLog("SECURITY", "Something went wrong", exe);
            return null;
        }
    }


    hash(plainText) {
        try {
            return md5(plainText);
        } catch (exe) {
            LoggingService.consoleLog("SECURITY", "Something went wrong", exe);
            return null;
        }
    }


    encrypt(plainText) {
        try {
            return cryptoJs.AES.encrypt(plainText, constant.config.utils.ENCRYPT_SALT).toString();
        } catch (exe) {
            LoggingService.consoleLog("SECURITY", "Something went wrong", exe);
            return null;
        }
    }

    decrypt(cipherText) {
        try {
            return cryptoJs.AES.decrypt(cipherText, constant.config.utils.ENCRYPT_SALT).toString(cryptoJs.enc.Utf8);
        } catch (exe) {
            LoggingService.consoleLog("SECURITY", "Something went wrong", exe);
            return null;
        }
    }

}


const securityClient = new SecurityClient();
export default securityClient;