import { Schema} from 'mongoose';
export const ArtworkSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    description: String,
    creationDate: Date,
    image: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    galleryId: { type: Schema.Types.ObjectId, ref: 'Gallery' },
})




