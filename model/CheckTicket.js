import mongoose from 'mongoose';

const Schema = mongoose.Schema

const checkTicketSchema = new Schema ({
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
    prize: {
        rewardNumbers: {
            giaiDB: {
                type: String,
                require: true
            },
            giaiNhat: {
                type: String,
                require: true
            },
            giaiNhi: {
                type: String,
                require: true
            },
            giaiBa: {
                giaiBa1: {
                    type: String,
                    require: true
                },
                giaiBa2: {
                    type: String,
                    require: true
                }
            },
            giaiTu: {
                giaiTu1: {
                    type: String,
                    require: true
                },
                giaiTu2: {
                    type: String,
                    require: true
                },
                giaiTu3: {
                    type: String,
                    require: true
                },
                giaiTu4: {
                    type: String,
                    require: true
                },
                giaiTu5: {
                    type: String,
                    require: true
                },
                giaiTu6: {
                    type: String,
                    require: true
                },
                giaiTu7: {
                    type: String,
                    require: true
                },
            },
            giaiNam: {
                type: String,
                require: true
            },
            giaiSau: {
                giaiSau1: {
                    type: String,
                    require: true
                },
                giaiSau2: {
                    type: String,
                    require: true
                },
                giaiSau3: {
                    type: String,
                    require: true
                }
            },
            giaiBay: {
                type: String,
                require: true
            },
            giaiTam: {
                type: String,
                require: true
            },
        }       
        
    },
   
},
{ timestamp: true}, // them truong createdAt + updatedAt
)

export const CheckTicket = mongoose.model('CheckTicket', checkTicketSchema);
