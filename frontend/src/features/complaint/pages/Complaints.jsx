import { Link } from "react-router-dom";
import { useComplaints } from "../hooks/useComplaints";
import { Loader2, MapPin, Timer } from "lucide-react";

const Complaints = () => {
  const { data, isPending } = useComplaints();
  const complaints = data?.complaints || [];

  if (isPending) {
    return (
      <div className="min-h-[calc(100vh - 4rem)] flex items-center justify-center">
        <Loader2 className="w-4 h-4 mr-3" /> Loading...
      </div>
    );
  }
  return (
    <div className="min-h-[calc(100vh-4rem)] grid grid-cols-3 gap-4 mt-4">
      {complaints.map((complaint, index) => (
        <Link
          to={`/complaints/${complaint._id}`}
          key={index}
          className="group relative h-96 rounded-2xl overflow-hidden 
             bg-white/5 backdrop-blur-lg border border-white/10 
             shadow-xl transition-all duration-300 
             hover:-translate-y-2 hover:shadow-2xl hover:border-blue-400/40"
        >
          {/* IMAGE */}
          <div className="relative h-[60%] overflow-hidden">
            <img
              src={complaint.image}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

            {/* TITLE ON IMAGE */}
            <h1 className="absolute bottom-3 left-4 right-4 text-lg font-semibold text-white leading-tight">
              {complaint.title}
            </h1>
          </div>

          {/* CONTENT */}
          <div className="p-4 flex flex-col justify-between h-[40%] text-sm text-slate-300">
            {/* META */}
            <div className="flex justify-between items-start gap-4">
              {/* DATE */}
              <div>
                <p className="text-xs text-slate-400 mb-1">Created</p>
                <span className="flex items-center gap-1 text-xs">
                  <Timer className="w-4 h-4" />
                  {new Date(complaint.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* LOCATION */}
              <div className="text-right max-w-[55%]">
                <p className="text-xs text-slate-400 mb-1">Location</p>
                <span className="flex items-start justify-end gap-1 text-xs leading-snug">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span className="break-words">{complaint.location}</span>
                </span>
              </div>
            </div>

            {/* STATUS BADGE */}
            <div className="mt-3">
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium
        ${
          complaint.status === "Pending"
            ? "bg-yellow-500/20 text-yellow-300"
            : "bg-green-500/20 text-green-300"
        }`}
              >
                {complaint.status}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Complaints;
