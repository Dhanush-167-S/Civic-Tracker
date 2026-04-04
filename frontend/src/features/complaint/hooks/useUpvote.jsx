import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upVoteComplaint } from "../services/api";
export const useUpvote = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upVoteComplaint,

    onMutate: async (complaintId) => {
      await queryClient.cancelQueries(["complaint", complaintId]);
      await queryClient.cancelQueries(["complaints"]);

      const previous = queryClient.getQueryData(["complaint", complaintId]);
      const previousList = queryClient.getQueryData(["complaints"]);

      const toggleVotes = (votes = []) => {
        const hasVoted = votes.includes(userId);
        return hasVoted
          ? votes.filter((id) => id !== userId)
          : [...votes, userId];
      };

      // detail
      queryClient.setQueryData(["complaint", complaintId], (old) => {
        if (!old) return old;
        return {
          ...old,
          complaint: {
            ...old.complaint,
            userVotes: toggleVotes(old.complaint.userVotes),
          },
        };
      });

      // list
      queryClient.setQueryData(["complaints"], (old) => {
        if (!old) return old;
        return old.map((c) =>
          c._id === complaintId
            ? { ...c, userVotes: toggleVotes(c.userVotes) }
            : c,
        );
      });

      return { previous, previousList };
    },

    onError: (err, complaintId, context) => {
      queryClient.setQueryData(["complaint", complaintId], context.previous);
      queryClient.setQueryData(["complaints"], context.previousList);
    },

    onSettled: (data, error, complaintId) => {
      queryClient.invalidateQueries(["complaint", complaintId]);
      queryClient.invalidateQueries(["complaints"]);
    },
  });
};
