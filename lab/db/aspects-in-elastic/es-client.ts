import { Client, SearchParams, IndicesPutMappingParams } from "elasticsearch";

export const TYPE_ENTITY = "entity";

export class EsClient {
    private _client: Client;

    constructor() {
        this._client = new Client({ hosts: ["http://127.0.0.1:9200"] });
    }

    public search = (params: SearchParams) => this._client.search(params);

    public putMapping = (params: IndicesPutMappingParams) => this._client.indices
        .putMapping(params)
    ;

    public dropIndex = () => this._client.indices
        .delete({ index: TYPE_ENTITY, ignoreUnavailable: true })
    ;

    public createIndex = () => this._client.indices.create({
        index: TYPE_ENTITY
    })

    public bulkPrepare = (values: any) => {
        const result: any[] = [];
    
        Object
            .getOwnPropertyNames(values)
            .forEach(id => {
                result.push({ index: { _index: TYPE_ENTITY, _type: TYPE_ENTITY, _id: id }});
                result.push(values[id]);
            })
        ;
    
        return result;
    }   

    public seed = (data: any) => this._client.bulk({
        refresh: "wait_for",
        body: this.bulkPrepare(data)
    });

    public searchById = (id: string) => this._client.search({
        index: TYPE_ENTITY,
        body: {
            query: {
                match: {
                    _id: id
                }
            }
        }
    });

    public searchByAspect = (aspect: string) => this._client.search({
        index: TYPE_ENTITY,
        body: {
            query: {
                exists: {
                    field: aspect
                }
            }
        }
    });

    public searchByLink = (target: string) => this._client.search({
        index: TYPE_ENTITY,
        body: {
            query: {
                nested: {
                    path: "link",
                    query: {
                        term: { "link.target": target }
                    }
                }
            }
        }
    });
}
