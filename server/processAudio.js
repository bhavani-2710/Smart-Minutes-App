// ✅ Full drop-in solution: use AssemblyAI + Hugging Face + Firebase (no OpenAI)
// 🔁 Use in your stopRecording function after uploading to Cloudinary

// import { addDoc, collection } from "firebase/firestore";
// import { db } from "../config/firebaseConfig";
import { pipeline } from "@xenova/transformers";
import axios from "axios";

const ASSEMBLY_API_KEY = "fd8fa98dfb0448e4aef3bab26ba9d22a";

export const processAudio = async (cloudinaryUrl, user) => {
  try {
    console.log("🧠 Sending audio to AssemblyAI...");
    const transcriptId = await submitToAssembly(cloudinaryUrl);
    let transcript = await pollAssemblyTranscript(transcriptId);
    console.log(transcript)
    transcript = "There are thousands  of languages in the world today. Some of them are strong languages spoken by many millions of people, while others are spoken by smaller groups of people, sometimes numbering in the hundreds. As languages die, benefits accrue to human society, but also drawbacks. It is certainly not advantageous for everybody everywhere. From a practical point of view, having fewer languages can lead to greater ease in communication. This is because when people share a language, then information and ideas can flow more easily, which is of utmost importance in a globalised world. In addition, there is an economic advantage, or economies of scale, since information can be presented in written form in greater bulk, meaning there is no need for translations, which can be costly. Thus, internationally, the flow of ideas and information is facilitated through the common language. There is another side, though. First of all, those who have lost a language have also lost a culture, a way of expressing themselves, and a way of understanding the world and their experience of the world. They will never be able to express themselves fully in their new language. Secondly, the quality of communication in the common language is limited. The reason for this is that people are writing and reading in an acquired language, not the mother tongue. Also, this acquired language may simply be unable to express some of the culturally-bound ideas of the non-native speaker. In brief, then, language death is a tragedy. Those whose language dies lose part of their identity, and a way to give expression to their deep thoughts and feelings. For the rest of the world, there is a loss of diversity. Along with the language, a whole culture and way of expressing this culture die. Things of deep human value that could be expressed before are now silenced."


    console.log("✍️ Sending to Hugging Face for summarization...");
    const summary = await summarizeText(transcript);

    // console.log("📦 Saving to Firestore...");
    // await addDoc(collection(db, "recordings"), {
    //   url: cloudinaryUrl,
    //   userId: user?.uid || null,
    //   transcript,
    //   summary,
    //   createdAt: new Date().toISOString(),
    // });

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

const summarizeText = async (text) => {
  const summarizer = await pipeline(
    "summarization",
    "Xenova/distilbart-cnn-12-6"
  );
  const response = await summarizer(text);
  console.log(response)
  return response[0].summary_text;
};
