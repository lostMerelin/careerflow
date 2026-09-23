import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteResume, fetchResumes, uploadResume } from "./resumeApi";

const RESUMES_KEY = ['resumes']

export function useResumes() {
    return useQuery({ queryKey: RESUMES_KEY, queryFn: fetchResumes })
}

export function useUploadResume(){
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ file, label }: { file: File; label: string }) => uploadResume(file, label),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: RESUMES_KEY }),
    })
}

export function useDeleteResume() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => deleteResume(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: RESUMES_KEY }),
    })
}