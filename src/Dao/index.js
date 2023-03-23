import userModal from '../Modal/userModal';


export const create = (data) => {
    try {
        return userModal.create(data);
    } catch (error) {
        console.error("Error in Dao Create Method", error);
        return error;
    }
}


export const getByEmail = (email) => {
    try {
        return userModal.findOne({ email });
    } catch (error) {
        console.error("Error in Dao GetByEmail Method", error);
        return error;
    }
}


export const getById = (id) => {
    try {
        return userModal.findById(id);
    } catch (error) {
        console.error("Error in Dao GetById Method", error);
        return error;
    }
}