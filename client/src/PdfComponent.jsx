import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { PDFDocument } from 'pdf-lib';

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

    async function createNewPdf() {
        
        const selectedPages = Object.keys(checkedPages).filter(page => checkedPages[page]);
        if (selectedPages.length === 0) {
            alert('No pages selected. Please select at least one page.');
            return;
        }

        const existingPdfBytes = await fetch(props.pdfFile).then(res => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const newPdfDoc = await PDFDocument.create();

        for (const page of Object.keys(checkedPages)) {
            if (checkedPages[page]) {
                const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [parseInt(page) - 1]);
                newPdfDoc.addPage(copiedPage);
            }
        }

        const pdfBytes = await newPdfDoc.save();
        // Create a Blob and download the PDF
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'new-pdf-file.pdf';
        link.click();
    }

    return (
        <div className='pdf-div'>
            <button onClick={createNewPdf}>Create & Download PDF from selected pages</button>
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

export default PdfComp;
