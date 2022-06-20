import React from 'react';

const Doc = ({ id, fileData, delFile, dwnFile }) => {

    const { title, date, content, author, labels, FileURL } = fileData;

    const formatDate = (date) => {
        return date.substring(8, 10) + date.substring(4, 8) + date.substring(0, 4);
    }

    const del = () => {
        delFile(id);

    }

    const filedw=(e)=>{
        dwnFile(fileData);
    }


    return (
        <div className="col">
        <div className="card mx-auto mb-3">

            <div className="card-header">
                <h3 className="card-title">{title}</h3>
            </div>

            <div className="card-body">
                <label className="card-text text-start">File: {content}</label>
            </div>

            <ul className="list-group list-group-flush">
                <li className=" list-pub list-group-item" style={{ 'fontSize': 12 }}>Upload date: {formatDate(date)}</li>
                <li className=" list-pub list-group-item" style={{ 'fontSize': 12 }}>Author: {author}</li>
                <li className=" list-pub list-group-item" style={{ 'fontSize': 12 }}>Labels: {labels}</li>
  
            </ul>

            <div className="card-footer">
                <button type="button" className="btn btn-danger btn-sm" onClick={del}>
                    Delete
                </button>
            </div>
            <div className="card-body mx-auto">
            <select class="form-control" id="exampleFormControlSelect1">
                    <option>Hoffman</option>
                    <option>LZW</option>
                    <option>LZ77</option>
                    <option>LZ78</option>
                    </select>
            </div>
            <button type="button" className="btn btn-danger btn-sm" onClick={(e)=>filedw(e)}>
                    Donwload
                </button>
        </div>
        </div>

    );

}

export default Doc;