import { useRef, useState, useEffect, type RefObject } from 'react';
import {
  FileUpload,
  type FileUploadRef,
} from '../../components/FormControls/FileUpload';
import { ProgressIndicator } from '../../components/ContentFeedback/ProgressIndicator';

export function FileUploadExamples() {
  const [acceptedFileError, setAcceptedFileError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[] | null>(null);
  const [uploadingExample, setUploadingExample] = useState<string | null>(null);
  const [completedExample, setCompletedExample] = useState<string | null>(null);

  const basicFileUploadRef = useRef<FileUploadRef>(null);
  const multipleFileUploadRef = useRef<FileUploadRef>(null);
  const countFileUploadRef = useRef<FileUploadRef>(null);
  const dropzoneFileUploadRef = useRef<FileUploadRef>(null);
  const acceptedFileUploadRef = useRef<FileUploadRef>(null);
  const sizeFileUploadRef = useRef<FileUploadRef>(null);
  const requiredFileUploadRef = useRef<FileUploadRef>(null);
  const circularFileUploadRef = useRef<FileUploadRef>(null);

  function handleAcceptedFileChange(files: FileList | null): boolean {
    const file = files?.[0];

    if (!file) {
      setAcceptedFileError('');
      return false;
    }

    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const fileName = file.name.toLowerCase();

    const isAllowed = allowedExtensions.some((extension) =>
      fileName.endsWith(extension),
    );

    setAcceptedFileError(
      isAllowed ? '' : 'Please select a PDF, DOC, or DOCX file.',
    );

    return isAllowed;
  }

  function handleUpload(files: FileList | null, example: string) {
    if (!files || files.length === 0) {
      setUploadedFiles(null);
      setUploadProgress(0);
      setIsUploading(false);
      setCompletedExample(null);
      setUploadingExample(null);
      return;
    }

    setUploadedFiles(Array.from(files));
    setUploadProgress(0);
    setCompletedExample(null);
    setUploadingExample(example);
    setIsUploading(true);
  }

  function handleCancelUpload(
    fileUploadRef: React.RefObject<FileUploadRef | null>,
  ) {
    fileUploadRef.current?.clear();

    setIsUploading(false);
    setUploadProgress(0);
    setUploadedFiles(null);
    setUploadingExample(null);
    setCompletedExample(null);
  }

  function renderUploadProgress(
    example: string,
    fileUploadRef: RefObject<FileUploadRef | null>,
    variant: 'linear' | 'circular' = 'linear',
  ) {
    if (uploadingExample !== example || !isUploading) {
      return null;
    }

    return (
      <div>
        <ProgressIndicator
          variant={variant}
          value={uploadProgress}
          label="Upload progress"
          showValue
          colour="info"
        />

        <button type="button" onClick={() => handleCancelUpload(fileUploadRef)}>
          Cancel upload
        </button>
      </div>
    );
  }

  useEffect(() => {
    if (!isUploading) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setUploadProgress((currentProgress) => {
        const nextProgress = Math.min(currentProgress + 5, 100);

        if (nextProgress === 100) {
          window.clearInterval(intervalId);

          switch (uploadingExample) {
            case 'basic':
              basicFileUploadRef.current?.reset();
              break;
            case 'multiple':
              multipleFileUploadRef.current?.reset();
              break;
            case 'count':
              countFileUploadRef.current?.reset();
              break;
            case 'dropzone':
              dropzoneFileUploadRef.current?.reset();
              break;
            case 'accepted':
              acceptedFileUploadRef.current?.reset();
              break;
            case 'size':
              sizeFileUploadRef.current?.reset();
              break;
            case 'required':
              requiredFileUploadRef.current?.reset();
              break;
          }

          setCompletedExample(uploadingExample);
          setIsUploading(false);
        }

        return nextProgress;
      });
    }, 200);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isUploading, uploadingExample]);

  return (
    <div>
      <h3>Examples</h3>

      <section>
        <h4>Basic File Upload</h4>

        <FileUpload
          ref={basicFileUploadRef}
          label="Upload a document"
          name="document"
          onChange={(files) => handleUpload(files, 'basic')}
        />

        {renderUploadProgress('basic', basicFileUploadRef)}

        {completedExample === 'basic' &&
          uploadedFiles &&
          uploadedFiles.length > 0 && (
            <p>
              Upload complete: <strong>{uploadedFiles[0].name}</strong>
            </p>
          )}
      </section>

      <section>
        <h4>Multiple Files</h4>

        <FileUpload
          ref={multipleFileUploadRef}
          label="Upload documents"
          name="documents"
          multiple
          showClearButton={
            uploadingExample === 'multiple' &&
            !isUploading &&
            uploadProgress === 100 &&
            uploadedFiles !== null
          }
          helperText="You can select multiple files."
          onChange={(files) => handleUpload(files, 'multiple')}
        />

        {renderUploadProgress('multiple', multipleFileUploadRef)}

        {uploadingExample === 'multiple' &&
          uploadedFiles &&
          uploadedFiles.length > 0 && (
            <div>
              <p>Upload complete:</p>
              <ul>
                {uploadedFiles.map((file) => (
                  <li key={`${file.name}-${file.lastModified}`}>
                    <strong>{file.name}</strong>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </section>

      <section>
        <h4>Maximum File Count</h4>

        <FileUpload
          ref={countFileUploadRef}
          label="Upload documents"
          name="limited-documents"
          multiple
          maxFileCount={2}
          helperText="You can select a maximum of 2 files."
          onChange={(files) => handleUpload(files, 'count')}
        />

        {renderUploadProgress('count', countFileUploadRef)}

        {uploadingExample === 'count' &&
          !isUploading &&
          uploadProgress === 100 &&
          uploadedFiles &&
          uploadedFiles.length > 0 && (
            <>
              <p>Upload complete:</p>

              <ul>
                {uploadedFiles.map((file) => (
                  <li key={`${file.name}-${file.lastModified}`}>
                    <strong>{file.name}</strong>
                  </li>
                ))}
              </ul>
            </>
          )}
      </section>

      <section>
        <h4>Drag and Drop File Upload</h4>

        <FileUpload
          ref={dropzoneFileUploadRef}
          label="Upload files"
          name="dropzone-files"
          variant="dropzone"
          multiple
          maxFileCount={2}
          helperText="Drag and drop files here, or use the file picker. Maximum of 2 files."
          onChange={(files) => handleUpload(files, 'dropzone')}
        />

        {renderUploadProgress('dropzone', dropzoneFileUploadRef)}

        {uploadingExample === 'dropzone' &&
          !isUploading &&
          uploadProgress === 100 &&
          uploadedFiles &&
          uploadedFiles.length > 0 && (
            <>
              <p>Upload complete:</p>

              <ul>
                {uploadedFiles.map((file) => (
                  <li key={`${file.name}-${file.lastModified}`}>
                    <strong>{file.name}</strong>
                  </li>
                ))}
              </ul>
            </>
          )}
      </section>

      <section>
        <h4>Accepted File Types</h4>

        <FileUpload
          ref={acceptedFileUploadRef}
          label="Upload a document"
          name="accepted-document"
          accept=".pdf,.doc,.docx"
          helperText="Accepted formats: PDF, DOC, and DOCX."
          errorMessage={acceptedFileError}
          onChange={(files) => {
            if (handleAcceptedFileChange(files)) {
              handleUpload(files, 'accepted');
            }
          }}
        />

        {renderUploadProgress('accepted', acceptedFileUploadRef)}

        {uploadingExample === 'accepted' &&
          !isUploading &&
          uploadProgress === 100 &&
          uploadedFiles &&
          uploadedFiles.length > 0 && (
            <p>
              Upload complete: <strong>{uploadedFiles[0].name}</strong>
            </p>
          )}
      </section>

      <section>
        <h4>File Size Validation</h4>

        <FileUpload
          ref={sizeFileUploadRef}
          label="Upload a document"
          name="size-limited-document"
          maxFileSize={5 * 1024 * 1024}
          // Test only:
          // maxFileSize={1024}
          helperText="Maximum file size: 5MB."
          onChange={(files) => handleUpload(files, 'size')}
        />

        {renderUploadProgress('size', sizeFileUploadRef)}

        {uploadingExample === 'size' &&
          !isUploading &&
          uploadProgress === 100 &&
          uploadedFiles &&
          uploadedFiles.length > 0 && (
            <p>
              Upload complete: <strong>{uploadedFiles[0].name}</strong>
            </p>
          )}
      </section>

      <section>
        <h4>Required File Upload</h4>

        <FileUpload
          ref={requiredFileUploadRef}
          label="Upload your resume"
          name="resume"
          accept=".pdf,.doc,.docx"
          required
          helperText="Please upload your resume."
          onChange={(files) => handleUpload(files, 'required')}
        />

        {renderUploadProgress('required', requiredFileUploadRef)}

        {uploadingExample === 'required' &&
          !isUploading &&
          uploadProgress === 100 &&
          uploadedFiles &&
          uploadedFiles.length > 0 && (
            <p>
              Upload complete: <strong>{uploadedFiles[0].name}</strong>
            </p>
          )}
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

      <section>
        <h4>Circular Upload Progress</h4>

        <FileUpload
          ref={circularFileUploadRef}
          label="Upload a document"
          name="circular-document"
          onChange={(files) => handleUpload(files, 'circular')}
        />

        {renderUploadProgress('circular', circularFileUploadRef, 'circular')}

        {completedExample === 'circular' &&
          uploadedFiles &&
          uploadedFiles.length > 0 && (
            <p>
              Upload complete: <strong>{uploadedFiles[0].name}</strong>
            </p>
          )}
      </section>
    </div>
  );
}
