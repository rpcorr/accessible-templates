# File Upload

An accessible file upload component for selecting one or more files. It uses the native HTML file input and provides an optional drag-and-drop interface as an enhancement.

## Features

- Uses a native `<input type="file">` element
- Keyboard accessible
- Supports screen readers
- Supports visible labels
- Supports single or multiple file selection
- Supports accepted file type hints
- Supports required and disabled states
- Supports helper text
- Supports validation and error messaging
- Supports drag-and-drop file selection
- Provides visible focus styling
- Provides visual feedback when files are dragged over the dropzone
- Supports file handling through `onChange`
- Responsive

## Installation

Import the component:

```tsx
import { FileUpload } from '../../components/FormControls/FileUpload';
```

Adjust the import path as needed based on the location of your file.

## Basic Usage

```tsx
<FileUpload label="Upload a document" name="document" />
```

## Accessibility

The File Upload component is designed with accessibility as a priority.

### Native File Input

The component uses the native HTML `<input type="file">` element. This provides built-in browser and operating system support for:

- Keyboard interaction
- File selection
- Screen readers
- Focus management
- Browser accessibility features

The native file input remains the primary mechanism for selecting files, including when the drag-and-drop interface is enabled.

### Labels

The component provides a visible label associated with the file input.

The label identifies the purpose of the control and allows users to understand what type of file they are expected to select.

### Keyboard Accessibility

The native file input can be operated using the keyboard.

Users can:

- Tab to the file input
- Use **Space** or **Enter** to open the file picker
- Navigate and select files using the operating system's file picker

The drag-and-drop interface does not replace the native file input. Keyboard users can always use the file picker.

### Screen Readers

The component uses a native file input with an associated visible label, allowing screen readers to identify the control and its purpose.

Helper text and error messages are associated with the input using `aria-describedby` when provided.

Validation errors use `role="alert"` so that important error information can be announced by screen readers.

### Drag and Drop

The `dropzone` option provides drag-and-drop functionality as an enhancement for users who prefer pointer interaction.

When files are dragged over the dropzone, the component provides visual feedback to indicate that files can be dropped.

The native file picker remains available as an accessible fallback.

The component does not attempt to announce the physical act of dragging files with a screen reader. Drag-and-drop is primarily a pointer interaction, while keyboard and screen reader users can use the native file picker.

### Focus

The native file input provides a visible focus indicator when focused using the keyboard.

Focus styling uses the project's shared focus color to provide a clear visual indication of the active control.

## File Type Restrictions

The `accept` prop can be used to provide a hint to the browser about which file types should be displayed in the file picker.

For example:

```tsx
<FileUpload
  label="Upload a document"
  name="document"
  accept=".pdf,.doc,.docx"
/>
```

The `accept` attribute **is not a security or validation mechanism**. Users may still be able to select files that do not match the specified types depending on the browser or operating system.

Applications should perform their own validation when files are selected and should also validate files on the server before processing or storing them.

Common `accept` values include:

```tsx
accept = '.pdf,.doc,.docx';
accept = 'image/*';
accept = '.jpg,.jpeg,.png';
accept = 'text/csv';
```

## Single File Upload

By default, the component allows users to select a single file.

```tsx
<FileUpload
  label="Upload a document"
  name="document"
  onChange={(files) => {
    console.log(files);
  }}
/>
```

The selected files are provided through the `onChange` callback as a `FileList` or `null`.

## Multiple File Upload

Set `multiple` to `true` to allow users to select multiple files.

```tsx
<FileUpload
  label="Upload documents"
  name="documents"
  multiple
  onChange={(files) => {
    console.log(files);
  }}
/>
```

The resulting `FileList` can be converted to an array when individual files need to be processed or displayed.

```tsx
const selectedFiles = files ? Array.from(files) : [];
```

## Drag and Drop

The `dropzone` option adds a drag-and-drop area for selecting files.

```tsx
<FileUpload
  label="Upload documents"
  name="documents"
  multiple
  dropzone
  onChange={(files) => {
    console.log(files);
  }}
/>
```

Users can drag files from their operating system and drop them onto the dropzone.

When files are dragged over the dropzone, visual feedback is provided to indicate that the area is ready to accept the files.

The native file input remains available so users can also select files using the standard file picker.

### Drag-and-Drop Accessibility

Drag and drop should be treated as an enhancement rather than the only method of selecting files.

The component continues to provide:

- A native file input
- Keyboard access
- A visible label
- Screen reader support
- Visible focus styling

This ensures that users who cannot or do not want to use drag and drop can still select files.

## Helper Text

The `helperText` prop can be used to provide additional instructions or information about the upload.

```tsx
<FileUpload
  label="Upload a resume"
  name="resume"
  accept=".pdf,.doc,.docx"
  helperText="Accepted formats: PDF, DOC, or DOCX."
/>
```

Helper text is associated with the file input using `aria-describedby`, allowing screen reader users to access the additional information.

Helper text can be used to communicate information such as:

- Accepted file types
- Maximum file size
- Upload instructions
- Additional requirements

## Validation and Error Messages

The `errorMessage` prop can be used to display a validation error.

```tsx
<FileUpload
  label="Upload a document"
  name="document"
  accept=".pdf,.doc,.docx"
  errorMessage="Please select a PDF, DOC, or DOCX file."
/>
```

When an error message is provided, the component marks the input as invalid and associates the error message with the file input.

Client-side validation can be performed using the `onChange` callback.

For production applications, file validation should also consider factors such as:

- File size
- File type
- File contents
- Security requirements
- Server-side validation

### Example: File Validation

```tsx
const handleFileChange = (files: FileList | null) => {
  if (!files || files.length === 0) {
    return;
  }

  const file = files[0];
  const maxSize = 5 * 1024 * 1024;
  const acceptedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  if (file.size > maxSize) {
    console.log('File is too large.');
    return;
  }

  if (!acceptedTypes.includes(file.type)) {
    console.log('File type is not supported.');
    return;
  }

  console.log('File is valid:', file.name);
};
```

The `accept` attribute can guide users during file selection, but applications should still validate selected files.

## Required

Set `required` to `true` when a file must be selected before a form can be submitted.

```tsx
<FileUpload label="Upload your resume" name="resume" required />
```

The native HTML `required` attribute is used so that the browser can identify the file input as required.

A visible indication should also be provided when required fields are used, and the surrounding form should clearly explain how required fields are identified.

## Disabled

Set `disabled` to `true` to prevent users from selecting files.

```tsx
<FileUpload label="Upload a document" name="document" disabled />
```

A disabled file input cannot be focused or activated by the user.

Disabled styling is provided to visually communicate that the control is unavailable.

## `onChange`

The `onChange` callback is called when files are selected through the file picker or dropped onto the dropzone.

```tsx
<FileUpload
  label="Upload files"
  name="files"
  multiple
  onChange={(files) => {
    if (!files) {
      return;
    }

    Array.from(files).forEach((file) => {
      console.log(file.name);
    });
  }}
/>
```

The callback receives a `FileList` or `null`.

Applications can use the callback to:

- Validate files
- Display selected file names
- Upload files
- Check file sizes
- Check file types
- Process file contents

## FileList Handling

The `FileList` returned by the file input is array-like but is not a standard JavaScript array.

Use `Array.from()` when array methods or iteration are required.

```tsx
const selectedFiles = files ? Array.from(files) : [];

selectedFiles.forEach((file) => {
  console.log(file.name);
});
```

Individual `File` objects provide information such as:

```tsx
file.name;
file.size;
file.type;
```

Applications should not assume that the file extension or MIME type supplied by the browser is sufficient for security-sensitive validation.

## Form Usage

The File Upload component can be used as part of a standard HTML form.

```tsx
<form onSubmit={handleSubmit}>
  <FileUpload
    label="Upload your resume"
    name="resume"
    accept=".pdf,.doc,.docx"
    required
  />

  <button type="submit">Submit</button>
</form>
```

The native file input participates in normal browser form behavior.

When processing uploaded files, applications should handle validation and upload errors appropriately.

## Complete Example

A typical document upload might combine an accepted file type, helper text, required state, and change handling.

```tsx
import { FileUpload } from '../../components/FormControls/FileUpload';

export function FileUploadExample() {
  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];

    console.log('Selected file:', file.name);
  };

  return (
    <FileUpload
      label="Upload your resume"
      name="resume"
      accept=".pdf,.doc,.docx"
      helperText="Accepted formats: PDF, DOC, or DOCX. Maximum file size: 5 MB."
      required
      onChange={handleFileChange}
    />
  );
}
```

## Props

| Prop           | Type                                | Default | Description                                                       |
| -------------- | ----------------------------------- | ------- | ----------------------------------------------------------------- |
| `label`        | `string`                            | —       | Visible label describing the file upload control.                 |
| `name`         | `string`                            | —       | Name of the file input.                                           |
| `accept`       | `string`                            | —       | Provides a hint about the file types accepted by the file picker. |
| `multiple`     | `boolean`                           | `false` | Allows users to select multiple files.                            |
| `required`     | `boolean`                           | `false` | Indicates that a file must be selected.                           |
| `disabled`     | `boolean`                           | `false` | Disables the file input.                                          |
| `helperText`   | `string`                            | —       | Additional instructions or information associated with the input. |
| `errorMessage` | `string`                            | —       | Displays a validation error and marks the input as invalid.       |
| `dropzone`     | `boolean`                           | `false` | Enables the optional drag-and-drop interface.                     |
| `onChange`     | `(files: FileList \| null) => void` | —       | Called when files are selected or dropped.                        |

## Best Practices

When using the File Upload component:

- Use a clear and descriptive label
- Tell users which file types are accepted
- Communicate file size limits before selection
- Use `helperText` for additional instructions
- Use `errorMessage` to clearly explain validation errors
- Do not rely on the `accept` attribute as a security mechanism
- Validate files on the client when appropriate
- Always perform appropriate server-side validation
- Keep the native file input available when providing drag and drop
- Do not make drag and drop the only way to select a file
- Provide meaningful feedback when a selected file cannot be accepted
- Avoid unnecessarily replacing native file input behavior with custom controls

## Accessibility Checklist

When implementing a file upload:

- Use a visible, descriptive label
- Ensure the label is associated with the file input
- Keep the native file input available
- Ensure the control can be reached and operated with a keyboard
- Provide visible focus styling
- Provide instructions for accepted file types
- Provide file size requirements when applicable
- Associate helper and error text with the input
- Use clear validation messages
- Do not rely solely on drag and drop
- Validate uploaded files on the server
