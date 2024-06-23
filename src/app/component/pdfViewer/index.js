'use client'
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

const PDFViewer = ({ file }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isRendered, setIsRendered] = useState(false);
    const [maxlength, setMaxLength] = useState(0);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages)
        setMaxLength(Math.ceil(numPages / numPages));
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
    const changeEnterPage = (e) => {
        let { value, min, max } = e.target;
        value = Math.max(Number(min), Math.min(Number(max), Number(value)));
        setIsRendered(true);
        setTimeout(() => {
            setPageNumber(value)
            setIsRendered(false);
        }, 100)
    }
    return (
        <>
            <div className='number-input'>
                <div className="downloaded">
                    <Link href={file} download="Example-PDF-document"
                        target="_blank"
                        className="btn-primary text-[18px] !m-0"
                        rel="noopener noreferrer">
                        Download
                    </Link>
                </div>
                <Input type={'number'} min={0} max={numPages} maxLength={maxlength} value={pageNumber} onChange={(e) => changeEnterPage(e)} /> of {numPages || "--"}
            </div>
            {/* <button type="button" disabled={pageNumber <= 1} onClick={prevPage}>
                    Previous
                </button>
                <button
                    type="button"
                    disabled={pageNumber >= numPages}
                    onClick={nextPage}
                >
                    Next
                </button> */}
            <div className="pdf-init">
                {
                    !isRendered &&
                    <Document
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}
                        options={{ workerSrc: "/pdf.worker.js" }}
                        loading="Loading Files, Please Wait..."
                        error="Error Get File from our server"
                        noData="No Data Available"
                    >
                        <Page height={800} scale={1.4} pageNumber={pageNumber} />
                    </Document>
                }
            </div>

        </>
    );
}

export default PDFViewer;