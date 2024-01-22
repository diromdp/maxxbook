'use client';
import Link from "next/link";
import PdfViewer from "../pdfViewer";

const DocumentDesc = ({ file }) => {
    return (
        <div className="document-Desc h-[100vh]">
            <div className="views-total-pages">
                <div className="item"><span className="title">20k views</span><span className="separator">.</span></div>
                <div className="item"><span className="title">91 pages</span></div>
            </div>
            <div className="title-document">
                <h1>List of Sahaba R.A - Updated</h1>
            </div>
            <div className="uploadBy">
                <p>Diunggah oleh <Link href={'/'}>Shadab Shaikh</Link>, Oct 02, 2010</p>
            </div>
            <div className="content-description">
                <p>
                    All Books From From India, Pakistan, Beirut, Saudi Arabia https://quranwahadith.com/ Call/Whatsapp: 91-9329669919 BEFORE START READING MY WORK I WOULD LIKE TO GIVE YOU SOME INFORMATION ABOUT IT. MY WORK IS TOTALLY UNBIASED AND INCLUDES WITH DETAILS ALL THE MAXIMUM POSSIBLE NAMES, AND INCLUDE THE NAMES ON WHICH SCHOLARS ALSO HAVE DIFFERENT VIEWS AND OPENION. BUT I HOPE THAT ALL THE READERES WHO HAVE GREAT INTEREST IN SAHABA WILL DEFINITELY LIKE IT. “INSHAALLAH”.
                    Attribution Non-Commercial (BY-NC)
                </p>
                <div className="mt-[16px]">
                    <span className="info"><b>Description Asli: </b>Format TersediaUnduh sebagai PDF, TXT atau baca online dari Scribd</span>
                    <span className="info"><b>Judul Asli:</b> List of Sahaba R.A - Updated www.QuranWaHadith.com</span>
                    <span className="info"><b>Hak Cipta:</b> List of Sahaba R.A - Updated www.QuranWaHadith.com</span>
                    <span className="info"><b>Unduh:</b> List of Sahaba R.A - Updated www.QuranWaHadith.com</span>
                </div>
            </div>
            <div className="pdf-viewer">
                <PdfViewer file={file} />
            </div>
        </div>
    );
}

export default DocumentDesc;