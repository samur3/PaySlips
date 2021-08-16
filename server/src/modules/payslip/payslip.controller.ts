import { Request, Response }    from "express";
import * as payslip_service     from "./payslip.service";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";

export const generatePaySlips = (req: Request, res: Response) => {
    try {
        const paySlipData =  payslip_service.generatePaySlips(req.body);
        res.statusCode = 200;
        res.send({status: SUCCESS, error:null, data:paySlipData});
    }
    catch (err){
        res.statusCode = 400;
        res.send({status: FAILURE, error: err, data: null});
    }
}