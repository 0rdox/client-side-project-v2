import { Schema} from 'mongoose';
import { ArtworkSchema } from '../../artwork/schema/artwork.schema';


export const ListSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    artworks: { type: [ArtworkSchema]}
})
// ListSchema.index({ title: 1, userId: 1 }, { unique: true });