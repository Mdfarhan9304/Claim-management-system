import { useEffect, useState } from "react";
import { ClaimsList } from "../components/claims/ClaimsList";
import { ClaimModal } from "../components/claims/ClaimModal";
import { Claim } from "@/types";
import { Search, Filter } from "lucide-react";
import axios from "axios";



export function InsurerDashboard() {
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [data, setData] = useState<Claim[]>([]);

  useEffect(() => {
    const fetchClaims = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/getall", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(JSON.stringify(res.data));
        setData(res.data);
      } catch (error) {
        console.error("Error fetching claims:", error);
      }
    };

    fetchClaims();
  }, []);


  const filteredClaims =
  statusFilter === "All"
    ? data
    : data.filter((claim) => claim.status === statusFilter);


  const handleClaimAction = (
    action: "approve" | "reject",
    data: { amount?: number; comments?: string }
  ) => {
    console.log("Claim action:", action, data);
    setSelectedClaim(null);
  };



  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Claims Dashboard</h1>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search claims..."
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Filter className="text-gray-400 h-5 w-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md py-2 pl-3 pr-10 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Claim Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClaims.map((claim) => (
                  <tr
                    key={claim._id}
                    onClick={() => setSelectedClaim(claim)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {claim.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {claim.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {claim.claimAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {claim.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedClaim && (
          <ClaimModal
            claim={selectedClaim}
            onClose={() => setSelectedClaim(null)}
            onAction={handleClaimAction}
            userType="insurer"
          />
        )}
      </div>
    </div>
  );
}
