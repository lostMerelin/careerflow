import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createJob, deleteJob, fetchJobs, updateJob} from "./jobApi";
import type {JobInput} from "../model/types";

const JOBS_KEY = ['jobs'];

export function useJobs() {
    return useQuery({queryKey: JOBS_KEY, queryFn: fetchJobs});
};

export function useCreateJob() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: JobInput) => createJob(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: JOBS_KEY});
        }
    });
};

export function useUpdateJob() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, payload}: {id: string, payload: Partial<JobInput>}) => updateJob(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: JOBS_KEY});
        }
    })
};

export function useDeleteJob() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteJob(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: JOBS_KEY});
        }
    })
};