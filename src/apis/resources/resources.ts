import instance from '../../lib/instance';
import { RESOURCE_TYPES } from '@/constants/resources';
import { AxiosResponse } from 'axios';

const URL = '/api/v1/resources'; 

interface ResourceGetDto {
  id: number,
  name: string,
  link: string,
  type: RESOURCE_TYPES,
}

interface ResourcePostDto {
  name: string,
  link: string,
  type: RESOURCE_TYPES,
}

interface ResourcePutDto {
  name: string,
  link: string,
  type: RESOURCE_TYPES,
}

export default {
  getAll: (): Promise<AxiosResponse<ResourceGetDto[]>> => instance.get(URL),

  get: (id: number): Promise<AxiosResponse<ResourceGetDto>> => instance.get(`${URL}/${id}`),

  add: (payload: ResourcePostDto): Promise<AxiosResponse<ResourceGetDto>> => instance.post(URL, payload),

  update: (id: number, payload: ResourcePutDto): Promise<AxiosResponse<ResourceGetDto>> => instance.put(`${URL}/${id}`, payload),

  remove: (id: number): Promise<AxiosResponse<void>> => instance.delete(`${URL}/${id}`),
};