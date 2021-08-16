import React            from 'react';
import { FileUpload }   from "./fileUpload";
import './home.scss';

export const Home = () => {

    return (
        <div className="container centered">
            <FileUpload fileData={""}/>
        </div>
    )
}