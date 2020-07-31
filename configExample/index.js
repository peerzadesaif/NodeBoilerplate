"use strict";
export const port = 8001;
export const host = "127.0.0.1";
export const environment = "development";
export const SERVICE_NAME = "admin-platform";
export const runClusterServer = false;

export const mongodb = { uri: "mongodb" };

export const utils = {
	PASSWORD_SALT: "SALT",
	JWT_SECRET: "SALT",
	JWT_TOKEN_EXPIRE: null,
	ENCRYPT_SALT: "SALT",

};

export const secret = {
	NODE_TOKEN_SECRET: "Basic Token",
};
export const amazon = {
	bucketName: "Here",
	imageUrl: "Route"
};
