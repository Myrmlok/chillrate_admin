import { json } from "stream/consumers";

class Security{

    private static tokenParamName='token';
    private static authParamName='user';
    static login(userData,token){
        localStorage.setItem(this.tokenParamName, token);
        localStorage.setItem(this.authParamName,JSON.stringify(userData));
    }
    static getToken(){
        return localStorage.getItem(this.tokenParamName);
    }
    static getAuth(){
        let userData=localStorage.getItem(this.authParamName);
        if(userData){
            userData=JSON.parse(userData);
        }
        return userData;
    }
    static logout(){
        localStorage.removeItem(this.tokenParamName);
        localStorage.removeItem(this.authParamName);
    }
}

export default Security;