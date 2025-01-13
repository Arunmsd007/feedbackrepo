const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Feedback = require('./models/fb');

const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://arunpvt2005:arun111975@feedbackdata.8cd8b.mongodb.net/?retryWrites=true&w=majority&appName=feedbackdata',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>console.log('MongoDb Connected'))
.catch(err=>console.error('MongoDb connection error',err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('view'));

app.get('/', (req, res)=>{
    res.sendFile(__dirname +'./view/index.html');
});

app.post('/submit-feedback', async (req, res)=>{
    const {name, contactNumber, email, feedback: feedbackText } = req.body;
    const feedback= new Feedback({
      name,
      contactNumber,
      email,
      feedback: feedbackText
    });

    try{
        await feedback.save();
        console.log('FeedBack Saved Successfully😊!!');
        res.send(`  
            <html>
                <head>
                    <title>Feedback Submitted 📩</title>
                </head>
                <body>
                    <h1>Thank You 🤗!!</h1>
                    <p>Your feedback has been sucessfully submitted 🙌</p>
                    <a href="/">Go Back to Form</a>
                </body>
            </html>
            `);

    } catch(err){
        console.error('Error Saving feedback:',err);
        res.status(500).send('There was an error in submitting your feedback');
    }
});

app.listen(port,()=>
{
    console.log(`Server is running on http://localhost:${port}`);


})
