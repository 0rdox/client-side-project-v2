import { Schema} from 'mongoose';
import { ArtworkSchema } from '../../artwork/schemas/artwork.schema';
export const GallerySchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    description: String,
    location: String,
    image: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    // artworks: [{ type: Schema.Types.ObjectId, ref: 'Artwork' }]
    artworks: [ArtworkSchema]
})




