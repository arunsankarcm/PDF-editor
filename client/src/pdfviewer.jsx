import { useState } from "react";
import { Document, Page } from "react-pdf";

function PdfViewer(props) {
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div className="pdf-div">
            <p>
                Page {pageNumber} of {numPages}
            </p>
            <Document file={props.pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from({ length: numPages }, (_, index) => (
                    <Page
                        key={index} // Add a key here using the index
                        pageNumber={index + 1}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                    />
                ))}
            </Document>

        </div>
    );
}
export default PdfViewer;