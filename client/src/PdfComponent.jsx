import { useState } from 'react';
import { Document, Page } from 'react-pdf';

function PdfComp(props) {
    const [numPages, setNumPages] = useState();
    const [checkedPages, setCheckedPages] = useState({});

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        const initialCheckedState = {};
        for (let i = 1; i <= numPages; i++) {
            initialCheckedState[i] = false;
        }
        setCheckedPages(initialCheckedState);
    }

    function handleCheckboxChange(page) {
        setCheckedPages({ ...checkedPages, [page]: !checkedPages[page] });

    }

    return (
        <div className='pdf-div'>
            <Document file={props.pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from({ length: numPages }, (_, i) => i + 1).map((page) => (
                    <div key={page}>
                        <label>
                            <input
                                type="checkbox"
                                checked={checkedPages[page]}
                                onChange={() => handleCheckboxChange(page)}
                            />
                            Page {page}
                        </label>
                        <Page
                            pageNumber={page}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                    </div>
                ))}
            </Document>
        </div>
    );
}

export default PdfComp