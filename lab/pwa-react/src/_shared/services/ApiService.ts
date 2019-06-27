import axios from "axios";

import { ID } from "@ide/mesh";
import { IGetQueryParams, IQueryPayload, IStorage } from "@lab/api-server";

export interface IApiService {
  create(query: IQueryPayload[]): Promise<ID[]>;
  update(query: IQueryPayload[]): Promise<ID[]>;
  remove(query: IQueryPayload[]): Promise<ID[]>;
  read(query: IQueryPayload[]): Promise<IStorage[]>;
}

export class ApiService implements IApiService {
  constructor(private endpointUrl: string = "http://localhost:3001") {}

  create(query: IQueryPayload[]): Promise<ID[]> {
    return axios.post(this.endpointUrl, query).then(response => response.data);
  }

  update(query: IQueryPayload[]): Promise<ID[]> {
    return axios.put(this.endpointUrl, query).then(response => response.data);
  }

  remove(query: IQueryPayload[]): Promise<ID[]> {
    return axios
      .delete(this.endpointUrl, { data: query })
      .then(response => response.data);
  }

  read(query: IQueryPayload[]): Promise<IStorage[]> {
    return axios
      .get(this.endpointUrl, { params: { query } as IGetQueryParams })
      .then(response => response.data);
  }
}

const apiService = new ApiService();
export default apiService;
