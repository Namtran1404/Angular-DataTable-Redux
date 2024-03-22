export class LoginValidate{
    errorEmptyField:boolean;
    errorInvalidUserName:boolean;
    constructor(){
        this.errorEmptyField=false;
        this.errorInvalidUserName=false;
    }
    isEmpty(username:string,password:string){
        this.errorEmptyField=false;
        this.errorInvalidUserName=false;
        if(username===''||password===''){
            this.errorEmptyField=true;
            return true;
        }
        return false;
    }
}