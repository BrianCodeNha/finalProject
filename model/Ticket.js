import mongoose from 'mongoose';

const Schema = mongoose.Schema

const ticketSchema = new Schema ({
    producer: {
        type: String,
        require: true
    },
    number: {
        type: Number,
        require: true 
    },
    date: {
        type: String,
        require: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
   
},
{ timestamp: true}, // them truong createdAt + updatedAt
)

export const Ticket = mongoose.model('Ticket', ticketSchema);
