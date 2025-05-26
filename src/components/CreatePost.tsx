import { ChangeEvent, useState } from "react";

type UploadImagesProps = {
  handleImage: (
    images: File[] | null,
    title: string,
    description: string
  ) => void;
};

const CreatePost = ({ handleImage }: UploadImagesProps) => {
  const [file, setFile] = useState<File[] | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = Array.from(e.target.files);
      setFile(file);

      // Create a FileReader to read the file
      // const reader = new FileReader();
      // // Read the file as a Data URL
      // reader.readAsDataURL(file);
      // reader.onloadend = () => {
      //   // When the file is loaded, set the result (Data URL) to the imagePreviewUrl state
      //   setImagePreviewUrl(reader.result as string);
      // };
    } else {
      setFile(null);
      setImagePreviewUrl(null);
    }
  };

  const handleClear = () => {
    setFile(null);
    setImagePreviewUrl(null);
    // Reset the file input value to allow selecting the same file again
    const fileInputElement = document.getElementById(
      "imageFile"
    ) as HTMLInputElement;
    if (fileInputElement) {
      fileInputElement.value = "";
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-3 mb-2 p-3 w-10/12 md:w-5/12 border-2 rounded">
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          Pick an image<label className="label">(Optional)</label>
        </legend>
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
          <button className="btn btn-sm btn-error mt-2" onClick={handleClear}>
            Clear Image
          </button>
        </div>
      )}
      <div className="w-full">
        <fieldset className="fieldset border-1 w-full rounded">
          <legend className="fieldset-legend m-2">Heading</legend>
          <input
            type="text"
            className="input w-full"
            placeholder="Type here"
            onChange={(e) => setTitle(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset border-1 w-full rounded">
          <legend className="fieldset-legend m-2">Description</legend>
          <input
            type="text"
            className="input w-full"
            placeholder="Type here"
            onChange={(e) => setDescription(e.target.value)}
          />
        </fieldset>
      </div>
      <input
        type="submit"
        value="Submit"
        className="btn btn-sm mt-3"
        onClick={() => handleImage(file, title, description)}
      />
    </div>
  );
};

export default CreatePost;
