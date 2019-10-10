
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import CsvInput from "./CsvInput";

function Interface({getCommaSeperatedEmails}) {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        console.log('Data ',data)
        
        //console.log('Emails ',emails)
        //setEmails(emails)

        //console.log(columns)
    }, [data, columns]);

    const handleFileChange = file => {
        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            complete: handleDataChange
        });
    };

    const makeColumns = rawColumns => {
        return rawColumns.map(column => {
            return { Header: column, accessor: column };
        });
    };

    const handleDataChange = file => {
        setData(file.data);
        
        getCommaSeperatedEmails(file.data)
        setColumns(makeColumns(file.meta.fields));
    };

    return (
        <div>
            <CsvInput handleFileChange={handleFileChange} data={data} />
            
        </div>
    );
}

export default Interface;