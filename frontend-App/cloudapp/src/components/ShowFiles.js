import React, {useState, useEffect} from 'react';
import axios from 'axios';
import FileDownload from 'js-file-download'
import Global from '../global';
import Doc from './Filech';



const Documents = () => {

    const [files, setFiles] = useState([]);
    const [Filterfiles, setFilterfiles]= useState([]);
    
    
    const url = Global.url;

    useEffect(() => {
        getFiles();
    }, []);


    //Obtenemos los artículos

    const getFiles = () => {
        axios.get(url + "getFiles").then(res => {
            setFiles(res.data.files);
            setFilterfiles(res.data.files);
        });
    }

    //Eliminamos un artículo por su id

    const deleteFile = (id) => {
        const idFiles = files[id]._id;
        axios.delete(url + "delete/" + idFiles).then(res => {
            getFiles();
        });
    }

    //Descargamos un archivo mediante su URL
    //Crear un nuevo metodo solo para changeURL evitar bugs

    const changeURL = (filedata)=>{
        console.log("update ULR!");
        axios.post("http://localhost:5000/changeurl", filedata).then(res=>{
            console.log(res.data);
        });
        setTimeout(function(){
            downloadFile(filedata);
        }, 1000);      
    }

    //                                                  DOWNLOAD
    const downloadFile = (filedata) =>{
        var param = filedata.content;
        console.log(param);
    
        let arr = param.split(".");
        console.log(arr);
        let namef = arr[0];
        let extension = arr.pop();
        console.log(namef+"."+extension);
        //tira el content
        //e.preventDefault()

        axios({
            url: "http://localhost:5000/download",
            method: "GET",
            responseType: "blob"
        }).then((res)=>{
            console.log(res);
            //File con extension
            FileDownload(res.data, namef+"."+ extension)
        })

    }

    //Filtrar busqueda
    const [busqueda, setBusqueda]= useState("");

    const handleChange=e=>{
        setBusqueda(e.target.value);
        console.log(busqueda);
        filterFiles(e.target.value);
      }

      const filterFiles=(searchElement)=>{
        var searchResults= Filterfiles.filter((element)=>{
            console.log(element.labels)
          if(element.author.toString().toLowerCase().includes(searchElement.toLowerCase())
          || element.title.toString().toLowerCase().includes(searchElement.toLowerCase())
          || element.labels.toString().toLowerCase().includes(searchElement.toLowerCase())
          ){
            return element;
          }
        });
        setFiles(searchResults);
      }



    return (

        <div className="publicaciones">
            <h1 className="mt-5">Local Files</h1>
            <div className='containerInput mx-5 mb-1'>
            <input
            className="form-control"
            value={busqueda}
            placeholder="Search Files"
            onChange={handleChange}
            />
        </div>
            <br /><br />
            <div className="container">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2">
                    {
                        files.length > 0 ? (

                            files.map((file, i) => {

                                return (




                                    <Doc
                                        key={i}
                                        id={i}
                                        fileData={file}
                                        delFile={deleteFile}
                                        dwnFile={changeURL}

                                    />




                                );
                            })

                        ) : (

                            <h3 className="mx-auto">Not files to show</h3>

                        )}
                </div>
            </div>
        </div>

    );
}

export default Documents;