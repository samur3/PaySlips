import express                  from "express";
import * as payslipController   from './payslip.controller'

export const payslipRouter = express.Router();

payslipRouter.post('/api/payslips', payslipController.generatePaySlips);