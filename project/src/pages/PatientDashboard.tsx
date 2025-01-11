import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClaimsList } from "../components/claims/ClaimsList";
import { Claim } from "@/types";
import { Plus } from "lucide-react";
import axios from "axios";

export function PatientDashboard() {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString); // Convert the ISO date string into a Date object
    return date.toLocaleDateString(); // Convert the Date object into a readable date (e.g., "1/10/2025")
  };

  const token = localStorage.getItem("token");
  const [claims, setClaims] = useState<Claim[]>([]);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const res = await axios.get("http://localhost:5000/myclaims", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(JSON.stringify(res.data));
        setClaims(res.data.claims);
      } catch (error) {
        console.error("Error fetching claims:", error);
      }
    };

    fetchClaims();
  }, [token]);

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const handleCloseModal = () => {
    setSelectedClaim(null);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Claims</h1>
          <Link
            to="/patient/submit-claim"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Claim
          </Link>
        </div>

        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-6 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {claims.map((claim, index) => (
              <tr
                key={index}
                onClick={() => setSelectedClaim(claim)}
                className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
              >
                <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900">
                  {claim.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {formatCurrency(claim.claimAmount)}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {claim.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {formatDate(claim.submissionDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedClaim && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative px-6 py-4">
                <button
                  onClick={handleCloseModal}
                  className="absolute top-2 right-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Close
                </button>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Claim Details
                </h2>

                <div className="space-y-6">
                  {/* Status */}
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-100 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-medium text-gray-800">
                        {selectedClaim.status}
                      </p>
                    </div>
                  </div>

                  <hr className="border-gray-200" />
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-green-100 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="grid grid-cols-2 gap-4 mt-1">
                        <div>
                          <p className="text-sm text-gray-500">Claimed:</p>
                          <p className="font-medium text-gray-800">
                            {selectedClaim.claimAmount}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Approved Amount:</p>
                          <p className="font-medium text-gray-800">
                            {selectedClaim.approvedAmount !== null
                              ? formatCurrency(selectedClaim.approvedAmount)
                              : "Not approved"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Description</p>
                      <p className="mt-1 text-gray-800">{selectedClaim.description}</p>
                    </div>
                  </div>

                  {/* Insurer Comments */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-700">Insurer Comments</p>
                    <p className="mt-2 text-sm text-gray-600">
                      {selectedClaim.insurerComments || "No comments provided"}
                    </p>
                  </div>

                  {/* Last Updated */}
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-purple-100 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-purple-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="font-medium text-gray-800">
                        {formatDate(selectedClaim.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
