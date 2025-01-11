import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import axios from "axios";
import { ClaimModal } from "../components/claims/ClaimModal";
import { Claim } from "@/types";

export function PatientDashboard() {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
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
        setClaims(res.data.claims);
      } catch (error) {
        console.error("Error fetching claims:", error);
      }
    };

    fetchClaims();
  }, [token]);

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
              <th className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900">
                Name
              </th>
              <th className="px-6 py-3.5 text-left text-sm font-semibold text-gray-900">
                Amount
              </th>
              <th className="px-6 py-3.5 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
              <th className="px-6 py-3.5 text-left text-sm font-semibold text-gray-900">
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
                  {claim.claimAmount}
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
          <ClaimModal
            claim={selectedClaim}
            onClose={() => setSelectedClaim(null)}
            userType="patient"
          />
        )}
      </div>
    </div>
  );
}
