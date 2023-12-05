import { Schema} from 'mongoose';
import { ArtworkSchema } from '../../artwork/schema/artwork.schema';
export const ListSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    description: String,
    image: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    artworks: [ArtworkSchema]
})
// ListSchema.index({ title: 1, userId: 1 }, { unique: true });