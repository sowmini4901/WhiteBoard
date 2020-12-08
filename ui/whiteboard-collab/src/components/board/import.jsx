import React from 'react';
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import filePDF from './sample.pdf'
class Import extends React.Component {
  state= {
    selectedFile: null
  }
  fileSelectHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
    //console.log(event.target.files[0]);
  }

  
render(){
  return (
   
    <div className="Import">
      <input style={{display: 'none'}} 
      type="file" 
      onChange={this.fileSelectHandler}
      ref={fileInput => this.fileInput=fileInput}/>
      <button onClick={()=> this.fileInput.click()}>Pick File</button>
     <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js">
    <div id="pdfviewer">
        <Viewer fileUrl={filePDF} /> 
    </div>
    </Worker>
    </div>
   );
  }
}

export default Import;