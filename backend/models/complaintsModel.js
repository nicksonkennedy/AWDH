const mongoose = require('mongoose')

const complaintSchema = mongoose.Schema(
    {
         customerType:{
            type: String,
            required: true
        },
        Encounter:{
            type: String,
            required: true
        },
        Description:{
            type: String
        },
        Rate:{
            type: String,
            required: true
        },
        Suggestion:{
            type: String,
            required: true
        },
       Contact:{
            type: String
        },
}
,
        {timestamps: true}
)

const Complaint = mongoose.model("complaint", complaintSchema)
module.exports = Complaint