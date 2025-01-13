import { Claim } from "@/types";
import axios from "axios";
import { X } from "lucide-react";
import { useState } from "react";

interface ClaimModalProps {
  claim: Claim;
  onClose: () => void;
  userType: "patient" | "insurer";
}

export function ClaimModal({ claim, onClose, userType }: ClaimModalProps) {
  const [comments, setComments] = useState("");
  const [amount, setAmount] = useState<number | undefined>(undefined);

  const handleAction = async (action: "Approve" | "Reject") => {
    if (userType !== "insurer") return;

    try {
      const approvedAmount = action === "Reject" ? 0 : amount;
      if (action=="Approve" && !amount) {
        alert("Please enter an approved amount.");
        return;
      }

      const payload = {
        status: action,
        insurerComments: comments,
        approvedAmount: approvedAmount,
      };

      const res = await axios.patch(
        `https://claim-management-system-2.onrender.com/claim/${claim._id}`,
        payload
      );

      alert(
        `Claim successfully ${action === "Approve" ? "Approved" : "rejected"}.`
      );
      onClose();
    } catch (error: any) {
      console.error(
        "Error updating status:",
        error.response?.data || error.message
      );
      alert("Failed to update claim status. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Claim Details</h2>

        <div className="space-y-4">
          <div>
            <label className="font-medium text-gray-700">Claim ID</label>
            <p>{claim._id}</p>
          </div>
          <div>
            <label className="font-medium text-gray-700">Patient Name</label>
            <p>{claim.name}</p>
          </div>
          <div>
            <label className="font-medium text-gray-700">Claim Amount Needed</label>
            <p>{claim.claimAmount}</p>
          </div>
          <div>
            <label className="font-medium text-gray-700">Description</label>
            <p>{claim.description}</p>
          </div>
          <div>
            <label className="font-medium text-gray-700">Status</label>
            <p className="capitalize">{claim.status}</p>
          </div>
          <div>
            <label className="font-medium text-gray-700">Document</label>
            <a
              href={`https://claim-management-system-2.onrender.com/${claim.uploadedDocument}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-500 block"
            >
              View Document
            </a>
          </div>

          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Approved Amount
              </label>
              <input
                type="number"
                name="amount"
                min="0"
                step="0.01"
                value={amount || ""}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Comments
              </label>
              <textarea
                name="comments"
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                type="button"
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                onClick={() => handleAction("Approved")}
              >
                Approve
              </button>
              <button
                type="button"
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                onClick={() => handleAction("Rejected")}
              >
                Reject
              </button>
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
