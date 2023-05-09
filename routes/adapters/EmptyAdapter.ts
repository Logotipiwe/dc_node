import AbstractAdapter from "./AbstractAdapter";

class EmptyAdapter extends AbstractAdapter<any, any>{
    toDocument(from: any): any {
        return from;
    }

    toDocuments(from: any[]): any[] {
        return from;
    }

    toEntities(from: any[]): any[] {
        return from;
    }

    toEntity(from: any): any {
        return from
    }
}
export default new EmptyAdapter()