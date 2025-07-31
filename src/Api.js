import axios from "axios";

class Api{
    static url=`http://26.229.77.233:8099/api/v1`;
    static token = null;  

    static setToken(jwt) {
      this.token = jwt;
    }

    static init() {
      axios.interceptors.request.use((config) => {
        if (this.token) {
          config.headers['Authorization'] = `Bearer ${this.token}`;
        }
        return config;
      });
    }

    static async register(name,email,password){
        return await axios.post(`${this.url}/auth/regAdmin`,{
            name:name,
            email:email,
            password:password})
        .then((response)=>{
            return response.data;
        })
        .catch((ex)=>{
            return ex;
        })
    }
    static async auth(name,email,password){
        return await axios.post(`${this.url}/auth/authenticate`,{
            name:name,
            email:email,
            password:password
        }).then((response)=>{
            return response.data;
        })
        .catch(ex=>ex);
    }

    // распределение
    static async getClientDist(uuid) {
      await axios.get(`${this.url}/client/${uuid}`)
        .then((response) => {
          return response.data;
        })
        .catch((ex) => {
          return ex;
        });
    }

    static async getTeams() {
      await axios.get(`${this.url}/team`)
        .then((response) => {
          return response.data;
        })
        .catch((ex) => {
          return ex;
        });
    }

    static async acceptUser(teamId, userId) {
      await axios.get(`${this.url}/team/${teamId}/${userId}`)
        .then((response) => {
          return response.data;
        })
        .catch((ex) => {
          return ex;
        });
    }

    static async removeUser(teamId, userId) {
      await axios.delete(`${this.url}/team/${teamId}/${userId}`)
        .then((response) => {
          return response.data;
        })
        .catch((ex) => {
          return ex;
        });
    }

    static async createTeam(name) {
      await axios.post(`${this.url}/team`, { name: name })
        .then((response) => {
          return response.data;
        })
        .catch((ex) => {
          return ex;
        });
    }

    static async editTeamName(name) {
      await axios.put(`${this.url}/team`, { name: name })
        .then((response) => {
          return response.data;
        })
        .catch((ex) => {
          return ex;
        });
    }

    static async deleteTeam(id) {
      await axios.delete(`${this.url}/team/${id}`)
        .then((response) => {
          return response.data;
        })
        .catch((ex) => {
          return ex;
        });
    }

    static async getTeamInfo(id) {
      await axios.get(`${this.url}/team/${id}`)
        .then((response) => {
          return response.data;
        })
        .catch((ex) => {
          return ex;
        });
    }

    static async getAdminUrl() {
      await axios.get(`${this.url}/admin/url`)
        .then((response) => {
          return response.data;
        })
        .catch((ex) => {
          return ex;
        });
    }

    static async getWaitUsers() {
      await axios.get(`${this.url}/admin/waitUsers`)
        .then((response) => {
          return response.data;
        })
        .catch((ex) => {
          return ex;
        });
    }

}
export default Api;