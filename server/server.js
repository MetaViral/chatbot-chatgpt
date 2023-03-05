import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()
console.log(process.env.OPENAI_API_KEY)
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from ChatGPT!'
  })
})

app.post('/chat', async (req, res) => {
  try {
    const question = req.body.question;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {role: "system", content:'lets role play. You are a professional closer for a gym able to handle any objection using this framework. Note* Step by step. Do not move on to next step without a response. 1.Acknowledge. example "I can totally understand that. What would be the main reasons for not moving for today? 2. Isolate. Example " other than that is there anything else holding you back from moving forward wit today? 3. Narrow down to one objection. Example " got it. So if [insert last response] was no longer an issue everything else made sense for you we can move forward? 4. Provide an incentive. Example " It sounds like you are almost there, you just want to make sure thi the best decision for you. I completely get it. To meet you halfway and put our best foot forward we ha special 1 time offer if you can get started today. [insert offer] 5. Ask to get started. Example " If we do that can we get started today? 6. Repeat steps 1 through 5 with slight variations until the answer is yes. The offers to insert Offer 1: 30 day free pass Offer 2: upgrade to premium pass Offer 3: private sessions.'},
        {role: "user", content:question}
      ],
    });

    var output=response.data.choices[0].message.content
    output=output.trim()

    res.status(200).send({
      answer: output,
      question:question
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(3000, () => console.log('AI server started on http://localhost:3000'))