import data from "../../database/data.json";

export default function handler(req, res) {
    
    res.status(200).json(data)
    //res.send(data)
  }