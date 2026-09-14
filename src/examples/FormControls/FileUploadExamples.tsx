import { useState } from 'react';
import { FileUpload } from '../../components/FormControls/FileUpload';

export function FileUploadExamples() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  return (
    <div>
      <h3>Examples</h3>

      <section>
        <h4>Basic File Upload</h4>

        <FileUpload
          label="Upload a document"
          name="document"
          onChange={setSelectedFiles}
        />

        {selectedFiles && selectedFiles.length > 0 && (
          <p>
            Selected file: <strong>{selectedFiles[0].name}</strong>
          </p>
        )}
      </section>

      <section>
        <h4>Multiple Files</h4>

        <FileUpload
          label="Upload documents"
          name="documents"
          multiple
          helperText="You can select multiple files."
          onChange={setSelectedFiles}
        />
      </section>

      <section>
        <h4>Accepted File Types</h4>

        <FileUpload
          label="Upload a document"
          name="accepted-document"
          accept=".pdf,.doc,.docx"
          helperText="Accepted formats: PDF, DOC, and DOCX."
        />
      </section>

      <section>
        <h4>Required File Upload</h4>

        <FileUpload
          label="Upload your resume"
          name="resume"
          accept=".pdf,.doc,.docx"
          required
          helperText="Please upload your resume."
        />
      </section>

      <section>
        <h4>Disabled File Upload</h4>

        <FileUpload
          label="Upload a document"
          name="disabled-document"
          disabled
          helperText="File uploads are currently unavailable."
        />
      </section>
    </div>
  );
}
