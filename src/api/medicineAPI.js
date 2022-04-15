import {axiosInstance} from "./baseAPI";
import axios from "axios";

export class MedicineAPI {
    getMedicine() {
        return axiosInstance.get('medicine/')
    }
    getTypes(){
        return axiosInstance.get('medicine_type/')
    }
    remove(id){
        return axiosInstance.delete(`medicine/${id}/`)
    }
    create(data){
        return axiosInstance.post('medicine/', data)
    }
    patch(id, data){
        return axiosInstance.patch(`medicine/${id}/`, data)
    }
}