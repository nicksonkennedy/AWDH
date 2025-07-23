const Complaints = require('../models/complaintsModel')

const addComplaints = async (req, res) =>{
    try {
        const {
      customerType,
      Encounter,
      Description,
      Rate,
      Suggestion,
      Contact
        } = req.body

        const newComplaint = new Complaints({
      customerType,
      Encounter,
      Description,
      Rate,
      Suggestion,
      Contact,
      
        })
        const savedComp = await newComplaint.save()
        res.status(200).json(savedComp)
    } catch (error) {
        res.status(400).json({errorMessage: error})
    }
}

const getComplaints = async (req, res) =>{
    const complaints = await Complaints.find().sort({ updatedAt: -1 })
    
    res.json(complaints)
}



module.exports = {
    addComplaints,
    getComplaints
}