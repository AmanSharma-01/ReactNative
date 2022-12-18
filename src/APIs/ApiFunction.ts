import Endpoints from "../Constants/Endpoints";
import { APIUtil } from "../Utils/ApiUtil";

export default class ApiFunctions {
    static getAllShifts = async () => {
        const {error, data} = await APIUtil.makeGetRequest(Endpoints.GET_SHIFTS);
        if(error) {
            return {error};
        }
        return data;
    };

    static getSingleShift = async (shiftUUID: string) => {
        const {error, data} = await APIUtil.makeGetRequest(Endpoints.GET_SINGLE_SHIFT.replace(`{id}`, shiftUUID));
        if(error) {
            return {error};
        }
        return data;
    };


    static bookSingleShift = async (shiftUUID: string) => {
        const {error, data} = await APIUtil.makePostRequest(Endpoints.BOOK_SINGLE_SHIFT.replace(`{id}`, shiftUUID));
        if(error) {
            return {error};
        }
        return data;
    };

    static cancelSingleShift = async (shiftUUID: string) => {
        const {error, data} = await APIUtil.makePostRequest(Endpoints.CANCEL_SINGLE_SHIFT.replace(`{id}`, shiftUUID));
        if(error) {
            return {error};
        }
        return data;
    };

};