import { Schema} from 'mongoose';
export const ArtworkSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    description: String,
    creationDate: { type: Date, required: true },
    image: { type: String, required: true },
    type: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    galleryId: { type: Schema.Types.ObjectId, ref: 'Gallery', required: true },
})
