import {api} from '@/shared/api/axios';
import type {Job, JobInput} from '../model/types';

export async function fetchJobs(): Promise<Job[]> {
    const { data } = await api.get<Job[]>('/api/v1/jobs');
    return data;
}

export async function createJob(payload: JobInput): Promise<Job> {
    const { data } = await api.post<Job>('/api/v1/jobs', payload);
    return data;
}

export async function updateJob(id: string, payload: Partial<JobInput>): Promise<Job> {
    const { data } = await api.patch<Job>(`/api/v1/jobs/${id}`, payload);
    return data;
}

export async function deleteJob(id: string): Promise<void> {
    await api.delete(`/api/v1/jobs/${id}`);
}