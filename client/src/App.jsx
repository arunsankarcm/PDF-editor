import { useEffect, useState } from "react";
import './App.css';
import axios from 'axios';
import { pdfjs } from 'react-pdf';
import PdfComp from "./PdfComponent";
import { useNavigate } from 'react-router-dom';
import LogoutHeader from "./logoutheader";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

function App(){
    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");
    const [allImage, setAllImage] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);

    const navigate = useNavigate();

    const navigateToList = () => {
        navigate('/list');
    };

    useEffect(() => {
        getPdf();
    }, []);

    const getPdf = async () => {
        const result = await axios.get("http://localhost:3000/file/get-files");
        setAllImage(result.data.data);
    };

    const showPdf = (pdf) => {
        setPdfFile(`http://localhost:3000/file/${pdf}`);

    };

    const submitImage = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("title", title);
        formdata.append("file", file);

        const result = await axios.post("http://localhost:3000/file/upload-files", formdata, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        if (result.data.status === "ok") {
            alert("Uploaded Successfully!!!");
            getPdf();
        }


    }
    return(
        <>
        <LogoutHeader />
            <div className="App">
                <form className="formStyle" onSubmit={submitImage}>
                    <h4>Upload files </h4>
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <br />
                    <input
                        type="file"
                        className="form-control"
                        accept="application/pdf"
                        required
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    < br />
                    <button className="btn btn-primary" type="submit">Submit</button>
                </form>
                <button className="btn btn-primary my-pdf-button" onClick={navigateToList}>Show my PDFs</button>
                <div className="uploaded">
                    <h4>Uploaded PDF:</h4>
                    <div className="output-div">
                        {allImage == null ? "" : allImage.map((data, index) => {
                            return (
                                <div className="inner-div" key={data._id || index}>
                                    <h6>Title: {data.title}</h6>
                                    <button className="btn btn-primary" onClick={() => showPdf(data.pdf)}>Show Pdf</button>
                                </div>

                            )
                        })}

                    </div>
                </div>
                <PdfComp pdfFile={pdfFile} />
            </div>
        </>
    );
}

export default App