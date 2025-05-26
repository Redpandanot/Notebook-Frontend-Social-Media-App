import { ChangeEvent, useState } from "react";

type UploadImagesProps = {
  handleImage: (images: File | null) => void;
};

const UploadImages = ({ handleImage }: UploadImagesProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);

      // Create a FileReader to read the file
      const reader = new FileReader();
      // Read the file as a Data URL
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // When the file is loaded, set the result (Data URL) to the imagePreviewUrl state
        setImagePreviewUrl(reader.result as string);
      };
    } else {
      setFile(null);
      setImagePreviewUrl(null);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-3">
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Pick an image</legend>
        <input
          type="file"
          className="file-input"
          onChange={handleFileInput}
          accept="image/*"
          id="imageFile"
        />
      </fieldset>
      {imagePreviewUrl && (
        <div className="mt-4 p-2 border border-base-300 rounded-lg">
          <img
            src={imagePreviewUrl}
            alt="Preview"
            className="max-w-xs max-h-48 rounded-md shadow-md"
          />
          {/* Optional: Add a button to clear the preview/selected file */}
          <button
            className="btn btn-sm btn-error mt-2"
            onClick={() => {
              setFile(null);
              setImagePreviewUrl(null);
              // Reset the file input value to allow selecting the same file again
              const fileInputElement = document.getElementById(
                "imageFile"
              ) as HTMLInputElement;
              if (fileInputElement) {
                fileInputElement.value = "";
              }
            }}
          >
            Clear Image
          </button>
        </div>
      )}
      <input
        type="submit"
        value="Submit"
        className="btn btn-sm"
        onClick={() => handleImage(file)}
      />
    </div>
  );
};

export default UploadImages;
