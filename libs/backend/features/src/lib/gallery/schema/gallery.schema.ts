import { Schema} from 'mongoose';
import { ArtworkSchema } from '../../artwork/schema/artwork.schema';
export const GallerySchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    description: String,
    location: { type: String, required: true },
    image: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    artworks: [ArtworkSchema]
})
