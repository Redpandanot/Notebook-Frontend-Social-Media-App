import { ChangeEvent, useState } from "react";

type UploadImagesProps = {
  handlePostCreation: (
    images: File[],
    title: string,
    description: string
  ) => void;
  handleCancel: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreatePost = ({
  handlePostCreation,
  handleCancel,
}: UploadImagesProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newlySelectedFiles = Array.from(e.target.files);

      if (file.length + newlySelectedFiles.length > 5) {
        window.alert("Cannot upload more than 5 images");
        return;
      }

      setFile((prevFiles) => [...prevFiles, ...newlySelectedFiles]);

      const newImagePreviewUrls: string[] = [];

      const selectedFiles = [...file, ...newlySelectedFiles];

      let filesProcessedCount = 0;

      selectedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
          // When a file is loaded, add its Data URL to the temporary array
          newImagePreviewUrls.push(reader.result as string);
          filesProcessedCount++;

          // Check if all files have been processed
          if (filesProcessedCount === selectedFiles.length) {
            // Once all files are loaded, update the state with all Data URLs
            setImagePreviewUrl(newImagePreviewUrls);
          }
        };
      });
    } else {
      setFile([]);
      setImagePreviewUrl([]);
    }
  };

  const handleClear = () => {
    setFile([]);
    setImagePreviewUrl([]);
    // Reset the file input value to allow selecting the same file again
    const fileInputElement = document.getElementById(
      "imageFile"
    ) as HTMLInputElement;
    if (fileInputElement) {
      fileInputElement.value = "";
    }
  };

  return (
    <div className="flex flex-col justify-center bg-neutral items-center mt-10 mb-2 p-3 sm:w-[600px] w-full border-2 rounded">
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-secondary-content">
          Pick an image<label className="label">(Optional)</label>
        </legend>
        <input
          type="file"
          className="file-input"
          onChange={handleFileInput}
          accept="image/*"
          id="imageFile"
          multiple
        />
      </fieldset>
      {imagePreviewUrl && (
        <div className="mt-4 p-2 border border-base-300 rounded-lg">
          {imagePreviewUrl.length > 0 &&
            imagePreviewUrl.map((url, index) => (
              <img
                key={index} // Important for React list rendering
                src={url}
                alt={`Preview ${index + 1}`}
                className="max-w-xs max-h-48 rounded-md shadow-md"
              />
            ))}
          <button className="btn btn-sm btn-error mt-2" onClick={handleClear}>
            Clear Image
          </button>
        </div>
      )}
      <div className="w-full">
        <fieldset className="fieldset border-1 w-full rounded">
          <legend className="fieldset-legend m-2 text-secondary-content">
            Heading {title.length}/75 (min 3 characters)
          </legend>
          <input
            type="text"
            className="input w-full"
            placeholder="Type here"
            onChange={(e) => setTitle(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset border-1 w-full rounded">
          <legend className="fieldset-legend m-2 text-secondary-content">
            Description {description.length}/1500 (min 3 characters)
          </legend>
          <textarea
            className="input w-full h-56 whitespace-pre-wrap break-words pt-3"
            rows={4}
            value={description}
            placeholder="Type here"
            onChange={(e) => setDescription(e.target.value)}
          />
        </fieldset>
      </div>
      <div>
        {(title.length < 3 ||
          title.length > 75 ||
          description.length < 3 ||
          description.length > 75) && (
          <button
            className="btn btn-sm mt-3 mr-3"
            onClick={() => handlePostCreation(file, title, description)}
          >
            Submit
          </button>
        )}
        <button
          className="btn btn-sm btn-secondary mt-3"
          onClick={() => handleCancel((prev) => !prev)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
