
import responseHelper from "@/app/helpers/responseHelper";


class ResponseService {
    constructor() {
    };

    sendResponse = (statusCode = null, message = null, apiVersion = 'No Version', data = null) => {
        let obj = { apiVersion: apiVersion, statusCode, ...responseHelper(statusCode), data };
        if (message) {
            obj['message'] = message;
            obj['_message'] = 'Custom Message';
        }
        return obj;
    };

    buildResponse = ({ statusCode, message, data }) => {
        return {
            status: false,
            statusCode,
            ...responseHelper(statusCode),
            message,
            data: data
        };
    };

    handleError = (error, req, res, next) => {
        const { statusCode = 405, message = null, apiVersion = 'No Version', data = null } = error;
        let _obj = { statusCode, apiVersion, data, device: req.app.get('device'), ...responseHelper(statusCode) };
        message ? (_obj['_message'] = 'Custom Message', _obj['message'] = message) : undefined
        return res.status(statusCode).json(_obj);
    };
};


const responseService = new ResponseService();
export default responseService;
