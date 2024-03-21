import { useEffect, useState } from "react";
import axios from "axios";
import { pdfjs } from "react-pdf";
import PdfViewer from "./pdfviewer";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function UserPdfs() {
  const [allImage, setAllImage] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);


  useEffect(() => {
    getPdf();
  }, []);

    const getPdf = async () => {
        try {
            console.log("Fetching PDFs...");
            const authToken = localStorage.getItem('authToken'); 
            const result = await axios.get("http://localhost:3000/users/user-pdfs", {
                headers: {
                    'Authorization': `Bearer ${authToken}` 
                }
            });          
            setAllImage(result.data);
        } catch (error) {
            console.error("Error fetching PDFs:", error);
        }
    };

    const showPdf = (filePath) => {
        setPdfFile(`http://localhost:3000/users/${filePath}`);
    };

  
    return (
        <div className="App">
            <div className="uploaded">
                <h4>Uploaded PDFs:</h4>
                <div className="output-div">
                    {allImage ? allImage.map((data) => (
                        <div className="inner-div" key={data._id}>
                            <h6>{data.username}'s PDF</h6>
                            <button
                                className="btn btn-primary"
                                onClick={() => showPdf(data.filePath)}
                            >
                                Show Pdf
                            </button>
                        </div>
                    )) : "Loading..."}
                </div>
            </div>
            <PdfViewer pdfFile={pdfFile} />
        </div>
    );
}

export default UserPdfs;
