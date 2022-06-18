import { CheckTicket } from '../model/CheckTicket.js'


export const createCheckTicket = (req, res, next) => {
    
    try {        
        const newCheckTicket = new CheckTicket({
            date: req.body.date,
            prize: {
                rewardNumbers: {
                    giaiDB: req.body.giaiDB,
                    giaiNhat: req.body.giaiNhat,
                    giaiNhi: req.body.giaiNhi,
                    giaiBa: {
                        giaiBa1: req.body.giaiBa1,
                        giaiBa2: req.body.giaiBa2
                    },
                    giaiTu: {
                        giaiTu1: req.body.giaiTu1,
                        giaiTu2: req.body.giaiTu2,
                        giaiTu3: req.body.giaiTu3,
                        giaiTu4: req.body.giaiTu4,
                        giaiTu5: req.body.giaiTu5,
                        giaiTu6: req.body.giaiTu6, 
                        giaiTu7: req.body.giaiTu7
                    },
                    giaiNam: req.body.giaiNam,
                    giaiSau: {
                        giaiSau1: req.body.giaiSau1,
                        giaiSau2: req.body.giaiSau2,
                        giaiSau3: req.body.giaiSau3,
                    },
                    giaiBay:req.body.giaiBay,
                    giaiTam: req.body.giaiTam,
                }                           
            },
            producer: req.body.producer,
            producerId: req.body.producerId
        })

        console.log("checkTicket", newCheckTicket);
        

        newCheckTicket.save().then(() => {
            console.log(`new checkTicket ${req.body.producer} on ${req.body.date} created`)
            res.send(`new checkTicket ${req.body.producer} on ${req.body.date} created`)
        })
        
    } catch (error) {
        console.log(error)
    }
}


export const getCheckTicket = (req, res) => {
   try {
    CheckTicket.find().then(checkTickets => {
        res.status(200).json(checkTickets)
    })
   } catch (error) {
       res.status(500).json({error: error})       
   }
}