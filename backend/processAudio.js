import axios from "axios";

const ASSEMBLY_API_KEY = "fd8fa98dfb0448e4aef3bab26ba9d22a";
const HF_TOKEN = "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";

export const processAudio = async (cloudinaryUrl, user) => {
  try {
    console.log("🧠 Sending audio to AssemblyAI...");
    const transcriptId = await submitToAssembly(cloudinaryUrl);
    let transcript = await pollAssemblyTranscript(transcriptId);
    console.log(transcript);
    transcript =
      "Some people claim that due to the rapid changes occurring in modern work places, it is better to employ younger than older people. I do not believe that this is the case. One argument in support of younger employees is that older employees could be more set in their ways and potentially against any change. To an extent this may be true, but there are many flexible and intelligent workers over 50, while there are inflexible and narrow-minded younger ones. Attitude towards change is a result not of age but of personality type. That said, physical changes occurring with age could mean certain jobs are more suited to a younger person. For instance, psychologists seem to be in agreement that memory declines with age for people not remaining mentally active. In high-tech industries such as computer programming, where it is so important to be able to work with so much information, numbers and calculations, being younger may be an advantage. However, older workers have a wide range of other positive attributes that they can bring to their working environment. Generally, they have more work experience than those who are younger. In addition, as can be seen with the trend of many department stores in the UK to take on older people, they are seen to be more reliable and respectful. These are important in any kind of working environment. In conclusion, therefore, there is not the evidence to support employing young people as opposed to those over 50. It would seem that a mix of the best qualities of old and young is preferential in order to ensure the most productive environment evolves.";

    console.log("✍️ Sending to Hugging Face for summarization...");
    const summary = await summarizeText(transcript);
    console.log(summary)

    return { transcript, summary };
  } catch (err) {
    console.error("❌ processAudio error:", err);
    throw err;
  }
};

const submitToAssembly = async (url) => {
  const res = await axios.post(
    "https://api.assemblyai.com/v2/transcript",
    { audio_url: url },
    {
      headers: { authorization: ASSEMBLY_API_KEY },
    }
  );
  return res.data.id;
};

const pollAssemblyTranscript = async (id) => {
  while (true) {
    const { data } = await axios.get(
      `https://api.assemblyai.com/v2/transcript/${id}`,
      {
        headers: { authorization: ASSEMBLY_API_KEY },
      }
    );
    if (data.status === "completed") return data.text;
    if (data.status === "error") throw new Error("Transcription failed");
    await new Promise((res) => setTimeout(res, 3000));
  }
};

// const summarizeText = async (text) => {
//   const summarizer = await pipeline(
//     "summarization",
//     "Xenova/distilbart-cnn-12-6"
//   );
//   const response = await summarizer(text);
//   console.log(response)
//   return response[0].summary_text;
// };

const summarizeText = async (text) => {
  try {
    const response = await axios.post(
      `https://router.huggingface.co/hf-inference/models/sshleifer/distilbart-cnn-12-6`,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    const result = response.data[0];
    const summary = result["summary_text"];
    return summary;
  } catch (error) {
    console.log(error);
  }
};