import { IQuery } from "./IQuery";
import { IQueryResult } from "./IQeuryResult";

export interface IQueryService {
    execute(query: IQuery): IQueryResult;
}