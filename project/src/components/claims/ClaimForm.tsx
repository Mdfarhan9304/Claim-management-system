import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";
import axios from "axios";

export function ClaimForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Please upload a file.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("claimAmount", formData.amount);
    data.append("description", formData.description);
    data.append("uploadedDocument", file);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post("https://claim-management-system-2.onrender.com/claim", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data)
      if (response.status === 200) {
        navigate("/patient/dashboard");
        

      } else {
        setError(response.data.message || "Something went wrong.");
        alert("Form submitted")
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to submit the claim. Please try again."
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB.");
      } else {
        setFile(selectedFile);
        setError("");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Submit a New Claim</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            required
            className="border-2 mt-1 block w-full rounded-md border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Claim Amount
          </label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            className="mt-1 block border-2 w-full rounded-md border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            required
            rows={4}
            className="mt-1 border-2  block w-full rounded-md border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Document
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            {file && (
              <div className="mt-2 text-sm text-gray-700">
                <p>
                  <strong>Selected file:</strong> {file.name}
                </p>
                <p>
                  <strong>Size:</strong> {(file.size / 1024).toFixed(2)}{" "}
                  KB
                </p>
              </div>

              
            )}
               <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept=".pdf,.png,.jpg"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
            </div>
         
         
          </div>
        </div> */}

        <div className=" bg-gray-50 flex items-center justify-center p-4">
          <div className="w-full max-w-xl  bg-white rounded-lg shadow-sm space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Upload Document</h2>
              <p className="text-sm text-gray-500">
                Share your files with us by dropping them here or clicking to
                upload
              </p>
            </div>

            <div className="relative border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="file"
                className="sr-only"
                accept=".pdf,.png,.jpg"
                onChange={handleFileChange}
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center gap-4 cursor-pointer p-8"
              >
                {file ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 rounded-full bg-blue-50">
                      <svg
                        className="h-8 w-8 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <button
                      className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center gap-2"
                      onClick={(e) => {
                        e.preventDefault();
                        setFile(null);
                      }}
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Remove file
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="p-4 rounded-full bg-blue-50">
                      <svg
                        className="h-8 w-8 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">
                        Drag & drop your file here or click to browse
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, PNG, JPG up to 10MB
                      </p>
                    </div>
                  </>
                )}
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit Claim
        </button>
      </form>
    </div>
  );
}
