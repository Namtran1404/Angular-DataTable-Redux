export class SessionToken{
    TOKEN_KEY:string;
    REFRESH_TOKEN:string;
    constructor(){
        this.TOKEN_KEY='access_token';
        this.REFRESH_TOKEN='refresh_token';
    }
}