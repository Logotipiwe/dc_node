
export default class EnvAccessor{
    static getDbType(): string {
        if(!process.env.DB){
            throw new Error("NO DB TYPE IS SET!!!")
        }
        return process.env.DB;
    }
}