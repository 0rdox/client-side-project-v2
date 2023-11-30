import { Schema} from 'mongoose';
export const GallerySchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    location: String,
    image: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    artworks: [{ type: Schema.Types.ObjectId, ref: 'Artwork' }]
})




