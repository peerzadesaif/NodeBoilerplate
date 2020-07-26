import * as constant from "@/app/helpers/constant";
import * as collection from "@/app/common/collection";

import statusType from "@/app/enum/statusType";

import ResponseService from "@/app/services/ResponseService";
import SecurityClient from "@/app/securityService/securityClient";

// Create a service to customer check

export const requestCheck = async (req, res, next) => {
	const { app, headers } = req;
	if (!headers.authorization) return res.status(statusType.UNAUTHORIZED).json(ResponseService.sendResponse(statusTypes.UNAUTHORIZED));

	// verify the token first
	const verify = SecurityClient.jwtVerify(headers.authorization);
	if (!verify) return res.status(statusType.UNAUTHORIZED).json(ResponseService.sendResponse(statusTypes.UNAUTHORIZED));

	const jwtData = SecurityClient.jwtDecode(headers.authorization);
	if (!jwtData || !jwtData.customerId || jwtData.customerId != tokenId.value || jwtData.customerType != 'ADMIN') return res.status(statusType.UNAUTHORIZED).json(ResponseService.sendResponse(statusTypes.UNAUTHORIZED));

	const existingAdmin = false;// We will Call Service to check client admin or not with a DB
	if (!existingAdmin || existingAdmin.error || !existingAdmin.value) return res.status(statusType.UNAUTHORIZED).json(ResponseService.sendResponse(statusTypes.UNAUTHORIZED));

	// attach meta
	const _meta = {
		apiType: 'ADMIN',
		clientId: jwtData.clientId
	};

	// eslint-disable-next-line require-atomic-updates
	req.meta = { ...req.meta, _meta };
	return next();
};