const useragent = require("useragent");

export const parseUserAgent = (device) => {
    try {
        // Old
        // req.headers["user-agent"],
        // const agent = useragent.parse(device);
        // New
        const agent = device.parser.useragent
        console.log('agent :>> ', agent);
        const parts = agent.toString().split("/");
        const browser = parts[0].trim();
        const platform = parts[1].trim();
        const _device = agent.device.family.toString();
        return `${browser}(Device-${device.type} | Platform-${platform})`;
    } catch (error) {
        console.error("Error Catch User Agent Parse: ", error);
        return "unidentified";
    }
};