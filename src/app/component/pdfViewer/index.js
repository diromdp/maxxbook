'use client'
import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

const PdfViewer = ({ file }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isRendered, setIsRendered] = useState(false);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages)
    }
    const changePage = (offset) => {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
        setIsRendered(false);
    }
    const prevPage = () => {
        setIsRendered(true);
        setTimeout(() => {
            changePage(-1)
        }, 100)
    }
    const nextPage = () => {
        setIsRendered(true);
        setTimeout(() => {
            changePage(1)
        }, 100)
    }

    return (
        <div >
            <div>
                <p>
                    Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
                </p>
                <button type="button" disabled={pageNumber <= 1} onClick={prevPage}>
                    Previous
                </button>
                <button
                    type="button"
                    disabled={pageNumber >= numPages}
                    onClick={nextPage}
                >
                    Next
                </button>
            </div>
            {
                !isRendered &&
                <Document
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                    options={{ workerSrc: "/pdf.worker.js" }}
                >
                    <Page pageNumber={pageNumber} />
                </Document>
            }
        </div>
    );
}

export default PdfViewer;