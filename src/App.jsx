import TurndownService from 'turndown';
import './App.css';
import { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [fileHTML, setFileHTML] = useState(null);
  const [mdFile, setMDFile] = useState();

  function selectFile(ev){
    const userFile = ev.target.files[0];
    setFile(ev.target.files[0]);

    console.log(userFile);
    console.log("SELECTING FILE");

    if (userFile){
      const fileReader = new FileReader();
  
      fileReader.addEventListener("load", (readEvent) => {
        console.log(readEvent.target.result);

        setFileHTML(readEvent.target.result);

      });
  
      fileReader.readAsText(userFile);
    }

  }

  function convertFile(ev){
    ev.preventDefault();

    if (fileHTML) {
      console.log("CONVERTING FILE");

      const turnDownService = new TurndownService();

      const convertedMD = turnDownService.turndown(fileHTML);
      console.log(convertedMD);

      setMDFile(convertedMD);


    } else {
      console.log("No user file selected");
    }

  }

  return (
    <>
      <h1>Convert HTML to Markdown</h1>
      <form className="htmlPicker" onSubmit={convertFile}>
        <label htmlFor="htmlInput">Find HTML File</label>
        <input type="file" name="htmlInput" id="htmlInput" onChange={selectFile}/>
        <button>Convert file</button>
      </form>
      {fileHTML && <textarea name="htmlTextArea" id="htmlTextArea" cols="60" rows="20" value={fileHTML} readOnly></textarea> }
      {mdFile && <textarea name="mdTextArea" id="mdTextArea" cols="60" rows="20" value={mdFile} readOnly></textarea>}
    </>
  )
}

export default App
