const express = require("express");
const app = express();
const mongoose = require("mongoose")
const bodyparser = require("body-parser");
const cors = require("cors");
const { createConnection } = require("mongoose");

MONGO_URI='mongodb+srv://arjunsharmarke99:BlueDuck!@cluster0.2nudz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'


mongoose.connect('mongodb+srv://arjunsharmarke99:BlueDuck!@cluster0.2nudz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log("connected to mongoose"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true }

})

const Contact = mongoose.model('contact', userSchema)

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/api/get", async (req, res) => {
    try {
        const contact = await Contact.find()
        res.send(contact);
    } catch (err) {
        res.send(err)
    }
});


app.post("/api/post", async (req, res) => {
    const { name, email, contact } = req.body;
   try{
    const newContact = new Contact ({name, email, contact});
    await newContact.save();
    res.status(201).send(newContact)
   }catch(err){
    res.status(400).send(err);
   }
});


app.delete("/api/remove/:id", async (req, res) => {
    const { id } = req.params;
     try{
        const result = await Contact.findByIdAndDelete(id);
        if(!result){
            res.send("Contact not found");
        }else{
            res.send(result);
        }
     } catch(err){
        res.send(err);
     }

});

app.get("/api/get/:id", async (req, res) =>{
    const {id} = req.params;
    try {
        const contact = await Contact.findById(id);
        if(!contact){
            res.send("contact not found");
        }else{
            res.send(contact);
        }
    }catch(err){
        res.send(err);
    }
})

// update a contact by id

app.put("/api/put/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, contact } = req.body;
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            { name, email, contact },
            { new: true, runValidators: true }
        );
        if (!updatedContact) {
            res.status(404).send("Contact not found");
        } else {
            res.send(updatedContact);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});



app.listen(5000, () => {
    console.log("server is running on port 5000");
});