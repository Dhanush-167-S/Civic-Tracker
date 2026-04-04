import { useParams } from "react-router-dom";
import { useComplaint } from "../hooks/useComplaint";
import { useUpvote } from "../hooks/useUpvote";
import { useAuth } from "@/features/auth/hooks/useAuth";

const ComplaintDetails = () => {
  const { id } = useParams();

  const { data, isLoading } = useComplaint(id);
  const { user } = useAuth();

  const { mutate: upvote, isPending } = useUpvote(user?.id);

  const complaint = data?.complaint || {};

  const isVoted = complaint.userVotes?.includes(user?.id);

  if (isLoading) {
    return <div className="p-10 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] pb-6">
      <div className="w-full h-[80vh] relative overflow-hidden">
        <img
          src={complaint.image}
          alt=""
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-black/50"></div>

        <span
          className={`absolute bottom-8 left-8 rounded-full backdrop-blur-md 
          bg-white/10 border border-white/20 px-4 py-2 font-medium text-sm 
          ${
            complaint.status === "Pending"
              ? "text-yellow-300"
              : "text-green-300"
          }`}
        >
          {complaint.status}
        </span>

        <span
          className="absolute bottom-8 right-8 rounded-full backdrop-blur-md 
          bg-white/10 border border-white/20 px-4 py-2 font-medium text-sm"
        >
          <button
            onClick={() => upvote(complaint._id)}
            disabled={isPending}
            className="flex items-center"
          >
            <svg
              viewBox="0 0 24 24"
              className={`w-6 h-6 mr-2 transition transform ${
                isVoted ? "fill-orange-500 scale-125" : "fill-gray-400"
              } ${isPending ? "opacity-50" : ""}`}
            >
              <path d="M12 4l-7 7h4v7h6v-7h4z" />
            </svg>

            {complaint.userVotes?.length || 0}
          </button>
        </span>
      </div>

      <div
        className="max-w-5xl mx-auto mt-10 p-8 rounded-2xl 
        bg-white/5 backdrop-blur-lg 
        border border-white/10 
        shadow-xl transition hover:-translate-y-1 hover:border-red-400/40"
      >
        <h2 className="text-2xl font-semibold text-red-400 mb-3">
          {complaint.title}
        </h2>

        <p className="text-sm text-slate-300 leading-relaxed mb-5">
          {complaint.description}
        </p>

        <div
          className="flex justify-between items-center text-xs text-slate-400 
          border-t border-white/10 pt-4"
        >
          <span className="flex items-center gap-1">
            📅{" "}
            <span>
              {complaint.createdAt
                ? new Date(complaint.createdAt).toLocaleDateString()
                : ""}
            </span>
          </span>

          <span className="flex items-center gap-1 text-right max-w-[60%]">
            📍 <span>{complaint.location}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;
