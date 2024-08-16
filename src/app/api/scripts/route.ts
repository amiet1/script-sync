// import { NextApiRequest, NextApiResponse } from "next";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
// });

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const message = "Which is the capital of Albania?";
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: message }],
//       temperature: 0,
//       max_tokens: 1000,
//     });
//     res.status(200).json(response);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// }
