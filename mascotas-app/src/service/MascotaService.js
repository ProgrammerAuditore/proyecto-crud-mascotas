import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const MASCOTA_API_BASE_URL = (process.env.REACT_APP_MASCOTA_API) ? process.env.REACT_APP_MASCOTA_API : "http://localhost:3033/api/v1/mascota";
axios.defaults.baseURL = MASCOTA_API_BASE_URL;

class MascotaService {

    getMascotas(){
        return axios.get(MASCOTA_API_BASE_URL);
    }

    createMascota(mascota){
        return axios.post(MASCOTA_API_BASE_URL, mascota, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }
        });
    }

    getMascota(mascotaId){
        return axios.get(`${MASCOTA_API_BASE_URL}/${mascotaId}`);
    }

    getSearchMascota(mascotaNombre){
        return axios.get(`${MASCOTA_API_BASE_URL}/search/${mascotaNombre}`);
    }

    updateMascota(mascota, mascotaId){
        return axios.put(`${MASCOTA_API_BASE_URL}/${mascotaId}`, mascota);
    }

    deleteMascota(mascotaId){
        return axios.delete(`${MASCOTA_API_BASE_URL}/${mascotaId}`);
    }

}

export default new MascotaService();