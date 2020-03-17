import axios from "axios";

const baseURL = "localhost:5000/api";

const instance = axios.create({
    baseURL
});

const baseApi = {
    get: (type: string, id: number) => {
        instance
            .get(type, { params: { id } })
            .then(response => {
                return response;
            })
            .catch(e => {
                console.error(e);
            });
    },
    getAll: (type: string) => {
        instance
            .get(type)
            .then(response => {
                return response;
            })
            .catch(e => {
                console.error(e);
            });
    },
    post: (type: string, data: any) => {
        instance
            .post(type, { data })
            .then(response => {
                return response;
            })
            .catch(e => {
                console.error(e);
            });
    },
    put: (type: string, data: any) => {
        instance
            .get(type, { data })
            .then(response => {
                return response;
            })
            .catch(e => {
                console.error(e);
            });
    },
    delete: (type: string, id: number) => {
        instance
            .get(type, {
                params: id
            })
            .then(response => {
                return response;
            })
            .catch(e => {
                console.error(e);
            });
    }
};

export default Api;
