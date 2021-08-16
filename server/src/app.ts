import express                from "express";
import cookieParser           from "cookie-parser";
import logger                 from "morgan";
import helmet                 from "helmet";
import { payslipRouter }      from "./modules/payslip/payslip.router";
import * as dotenv            from "dotenv";
import * as middleware        from "./middleware";

const app = express();

const path = `${__dirname}/../../.env.development`;
//using morgan logger with dev format
app.use(logger('dev'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
dotenv.config({ path });
app.set("port", process.env.PORT || 5000);
//security library
app.use(helmet());

app.use(express.json({
    limit: '100mb'
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('',payslipRouter);

app.use(middleware.handleError);
app.use(middleware.notFound);

app.listen(app.get('port'), () => {
    console.log(` App is running at ${process.env.URL}:${app.get("port")}`);
})




