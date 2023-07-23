import { useState } from "react";
import axios from "axios";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadedFileUrl(response.data.fileUrl);
    } catch (error) {
      console.error("Failed to upload file:", error);
    }
  };

  const handleDownload = () => {
    if (uploadedFileUrl) {
      window.open(uploadedFileUrl, "_blank");
    }
  };

  return (
    <div>
      <h1>File Upload & Download</h1>
      <div>
        <label htmlFor="fileInput">
          Select a file:
        </label>
        <input
          type="file"
          id="fileInput"
        
          onChange={handleFileChange}
        />
        <button
          
          disabled={!selectedFile}
          onClick={handleUpload}
        >
          Upload
        </button>
        {uploadedFileUrl && (
          <div>
            <span>File uploaded!</span>
            <button
            
              onClick={handleDownload}
            >
              Download
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;