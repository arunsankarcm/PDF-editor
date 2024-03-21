require("../models/pdfDetails");
const mongoose = require("mongoose");
const PdfSchema = mongoose.model("PdfDetails");


exports.uploadFile = async (req,res) => {
   console.log(req.file);
   const title = req.body.title;
   const fileName = req.file.filename;
   try{
      await PdfSchema.create({title:title, pdf:fileName});
      res.send({status:"ok"});
   } catch(error) {
      res.json({status:error})
   }
};

exports.getFile = async (req, res) => {
   try {
      PdfSchema.find({}).then((data) => {
         res.send({ status: "ok", data: data });
      });
   } catch (error) { }
}


