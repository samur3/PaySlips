import React, { useState }              from 'react';
import { CSVReader }                    from "react-papaparse";
import { CSVLink }                      from "react-csv";
import { generatePaySlips }             from "./payslipApi"
import { parseCSVData }                 from "./parseCSVData";
import '../home.scss';

let csvLinkEl:any = React.createRef();
let readerRef:any = React.createRef();

//optional for future feature: inject the file
export interface FileUploadProps {
    fileData: any
}

export const FileUpload = ({fileData}: FileUploadProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [generatedFileData, setGeneratedFileData] = useState("");
    const [csvFileData, setCsvFileData] = useState(fileData);

    const uploadFile = () => {
        const parsedData = parseCSVData(csvFileData);
        if(parsedData !== null && parsedData.employeesDetailsData.length > 0){
            setIsLoading(true);
            generatePaySlips(parsedData).then((csvDataResponse: string) =>{
                setGeneratedFileData(csvDataResponse);
                csvLinkEl.current.link.click();
                setIsLoading(false);
            }).catch ((error: string) => {
                setError(error);
            });
        }
        else{
            setError("file is empty or invalid");
            setCsvFileData("");
        }
    }

    const handleOnDrop = (data: any) => {
        setCsvFileData(data);
    }

    const handleOnRemoveFile = () => {
        setError("");
        setCsvFileData("");
    }

    const handleOnFileLoad = () => {
        readerRef.current.removeFile();
        setError("");
        setCsvFileData("");
    }

    return (
        <div className="container centered">
            <div className="child">
                <CSVReader
                    accept={".csv"}
                    ref={readerRef}
                    onDrop={handleOnDrop}
                    addRemoveButton
                    removeButtonColor='#659cef'
                    onRemoveFile={handleOnRemoveFile}
                >
                    <span id="drop">Drop CSV file here or click to upload.</span>
                </CSVReader>
            </div>
            {isLoading ? <div className="child"><span className="process">Generate Pay Slips...</span></div> : null}
            {error ? <div className="child"><span className="error">Error Generate Pay Slips</span></div> : null}
            {csvFileData ?
                <div className="generate-button-container child">
                    <button
                        id="generateFile"
                        hidden={isLoading}
                        onClick={() => {
                            uploadFile()
                        }}
                        className="generate-button">Generate Pay Slips</button>
                </div> : null
            }
            <CSVLink
                filename="try101.csv"
                data={generatedFileData}
                onClick={handleOnFileLoad}
                ref={csvLinkEl}
            />
        </div>
    )
}