import React, { useState } from 'react';
import axios from 'axios';
import {Navigate} from 'react-router-dom';
import Global from '../global';

const New = () =>{

    const url = Global.url;

    const [document, setDocument] = useState({
        title: null,
        content: null,
        author: null,
        labels: null,
        FileURL: null
    });

    // State para redireccionar a la seccion de los documentos

    const [redirect, setRedirect] = useState(false);

    //Referencia a los datos ingresados

    let titleRef = React.createRef();
    let authorRef = React.createRef();
    let labelsRef = React.createRef();

    const changeState = () =>{
        setDocument({
            title: titleRef.current.value,
            content: null,
            author: authorRef.current.value
        });

        console.log(document);
    }

    //Funcion para enviar el File al Backend//

    const [image, setImage] = useState({ preview: '', data: '' })

    const handleSubmit = async (e) => {

        let formData = new FormData()
        formData.append('file', image.data)
        const response = await fetch('http://localhost:5000/image', {
            method: 'POST',
            body: formData,
        })
        
        if (response){}
        return console.log("file upload");
    }
    
    const handleFileChange = (e) => {
        //changeState();

        console.log("file :" + e.target.files[0]["name"]);

        const nameFile = (e.target.files[0]['name']);

        const fileURL = "http://localhost:5000/download/";

        setDocument({
            title: titleRef.current.value,
            content: nameFile,
            author: authorRef.current.value,
            labels: labelsRef.current.value,
            FileURL: fileURL + nameFile
        })

        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img)
    }

    // Funcion que envia los datos al MongoDB
    
    const sendData = (e) =>{
        //Evitar que la pagina no se refresque al enviar los datos
        e.preventDefault();
        
        //Peticion Htpp por POST para guardar el documento usando Axios

        axios.post(url + 'save', document).then(res=>{
            setRedirect(true);
            console.log(res.data);
        });

        console.log(document);
    }

    if(redirect){
        return <Navigate to = "documents" />
    }


    return(
        <div className="new-doc">

            <div id="document" className="card mx-auto mb-3 mt-5" style={{width:'30em'}}>

                <div className="card-header text-dark">

                    <h4> Create new File </h4>

                </div>

                <div className="card-body">

                    <form onSubmit={sendData}>
                        <div className="mb-3">
                            <label>Title</label>
                            <input type="text" className="form-control" id="title" name="title" ref= {titleRef} onChange={changeState} 
                            placeholder="This file contains..." required />

                        </div>

                        <div className="mb-3">
                            <label>Author</label>
                            <input type="text" className="form-control" id="author" name="author" ref= {authorRef} onChange={changeState}
                            placeholder="Created by..."required />
                        </div>

                        <div className="mb-3">
                            <label>Labels</label>
                            <input type="text" className="form-control" id="labels" name="labels" ref= {labelsRef} onChange={changeState}
                            placeholder="pdf, txt , doc , etc..." required />
                        </div>

                        <div className="mb-3">
                            <label>File</label>
                            <input type="file" className="form-control" id="file" name="file" accept='.*' onChange={handleFileChange}
                            required />

                        </div>

                        <div className="mb-3">
                            <input className="form-control btn btn-primary" type="submit" id="publish" value="Save" onClick={()=>handleSubmit()} />

                        </div>

                    </form>


                </div>

            </div>

        </div>

    );
}

export default New;