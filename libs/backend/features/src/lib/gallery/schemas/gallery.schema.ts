import { Schema} from 'mongoose';
export const GallerySchema = new Schema({
    name: String,
    location: String,
    image: String,
})


