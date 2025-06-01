
// Utility for Gemini AI API integration
import { toast } from "@/components/ui/use-toast";

// Gemini API key
const GEMINI_API_KEY = "AIzaSyA2GgeqvieKn3W9deh2NPAmg2nYdaNYlnE";

// Persona instruction for Sangata
const SANGATA_PERSONA = `You are Sangata Didi, a loving and empathetic AI assistant created to support rural women in India with their health and well-being. Your role is to act like a trusted elder sister, speaking in a warm, conversational, and culturally sensitive tone. Use simple, relatable language, mixing English with basic Hindi phrases (e.g., "Didi," "bahan," "theek hai," "accha," "chinta mat karo") to make women feel comfortable and understood. Your responses should feel like a heartfelt chat with a sister who cares deeply.

Your expertise includes:
- Maternal health: Pregnancy care, safe delivery practices, postnatal recovery, breastfeeding tips.
- Nutrition: Affordable, locally available foods (e.g., dal, palak, gud) to combat anemia, malnutrition, or fatigue.
- Mental well-being: Stress management, coping with family pressures, self-care practices, and building confidence.
- Reproductive health: Menstrual hygiene, addressing myths, family planning, and sexual health education.
- Healthcare access: Guidance on finding ASHA workers, local clinics, or government schemes like Ayushman Bharat.
- General well-being: Simple exercises, sleep hygiene, and tips for balancing household responsibilities.

Guidelines for responses:
1. Always respond with empathy, encouragement, and positivity, like a sister cheering her sibling on. Example: "Bahan, you're so strong for all you do! Let's take care of you too, theek hai?"
2. Provide practical, actionable advice suited to rural settings, considering limited resources (e.g., low-cost home remedies, local ingredients).
3. Address cultural stigmas (e.g., menstruation, mental health) gently, with respect and education to dispel myths.
4. For sensitive topics (e.g., abuse, reproductive issues), respond with care, avoid judgment, and suggest speaking to a trusted healthcare provider or ASHA worker.
5. If a question is unclear or you lack information, say, "Didi doesn't know everything, but let's figure this out together!" and offer a practical next step or resource.
6. Use positive affirmations to boost confidence, e.g., "You're doing so much, meri pyari bahan, and I'm always here for you!"
7. Keep responses concise but warm, avoiding medical jargon. If medical advice is needed, recommend consulting a doctor or ASHA worker.
8. If the user shares location details, tailor advice to local resources (e.g., nearby clinics, regional schemes), but don't ask for personal information unless provided.

Pay special attention to women's health topics and rural healthcare challenges.`;

// Rural health and women's health knowledge in India
const HEALTH_CONTEXT = `
Key women's health topics in rural India:

1. Reproductive Health:
- Menstrual health and hygiene with limited access to sanitary products
- Maternal health concerns including anemia during pregnancy (affects 50-60% of pregnant women)
- Family planning and reproductive choices with limited education
- High maternal mortality rates in remote areas

2. Nutrition:
- Iron deficiency anemia (affects 53% of women in rural India)
- Malnutrition, especially during pregnancy and lactation
- Affordable nutritious foods like lentils, leafy greens, seasonal vegetables
- Traditional nutritious foods like ragi, jowar, bajra

3. Common Health Issues:
- Urinary tract infections due to poor sanitation
- Anemia and related fatigue/weakness
- Gynecological issues often left untreated due to stigma
- Cervical cancer (higher rates due to limited screening)

4. Health Access Barriers:
- Distance to healthcare facilities (average 5-25km from villages)
- Financial constraints for treatment and medicines
- Cultural barriers and family permission needed for care
- Low health literacy and awareness of symptoms

5. Mental Health:
- Depression and anxiety often undiagnosed
- Domestic violence (35% of rural women report experiencing)
- Stress from multiple responsibilities
- Limited mental health support systems

6. Government Programs:
- Janani Suraksha Yojana (JSY) for institutional deliveries
- ASHA (Accredited Social Health Activist) workers in villages
- Ayushman Bharat health insurance scheme
- National Rural Health Mission services

Local remedies and practices:
- Turmeric milk for infections and inflammation
- Ajwain (carom seeds) for digestive issues
- Tulsi (holy basil) for respiratory problems
- Ginger-lemon-honey for colds and coughs
`;

// Function to get a response from Gemini API
export async function getGeminiResponse(
  userMessage: string,
  language: 'en' | 'hi' = 'hi'
): Promise<string> {
  try {
    // Determine content based on language
    const languageInstruction = language === 'hi' 
      ? "Respond primarily in Hindi with some English words mixed in." 
      : "Respond primarily in English with some Hindi phrases mixed in for warmth.";

    // Construct the API request with the correct endpoint and model
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=" + GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `${SANGATA_PERSONA}\n\n${HEALTH_CONTEXT}\n\n${languageInstruction}\n\nUser's message: ${userMessage}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 800,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        }),
      }
    );

    if (!response.ok) {
      console.error("Gemini API error:", await response.text());
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the response text
    if (data.candidates && 
        data.candidates[0] && 
        data.candidates[0].content && 
        data.candidates[0].content.parts && 
        data.candidates[0].content.parts[0] &&
        data.candidates[0].content.parts[0].text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Unexpected API response format");
    }
  } catch (error) {
    console.error("Error getting response from Gemini:", error);
    
    // If we have a fallback option, let's try that
    try {
      // Define languageInstruction here again for the fallback
      const fallbackLanguageInstruction = language === 'hi' 
        ? "Respond primarily in Hindi with some English words mixed in." 
        : "Respond primarily in English with some Hindi phrases mixed in for warmth.";
        
      // Fallback to a different model if the first one fails
      const fallbackResponse = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `${SANGATA_PERSONA}\n\n${HEALTH_CONTEXT}\n\n${fallbackLanguageInstruction}\n\nUser's message: ${userMessage}`
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 800,
            }
          }),
        }
      );

      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json();
        if (fallbackData.candidates && 
            fallbackData.candidates[0] && 
            fallbackData.candidates[0].content && 
            fallbackData.candidates[0].content.parts && 
            fallbackData.candidates[0].content.parts[0] &&
            fallbackData.candidates[0].content.parts[0].text) {
          return fallbackData.candidates[0].content.parts[0].text;
        }
      }
    } catch (fallbackError) {
      console.error("Fallback Gemini API also failed:", fallbackError);
    }
    
    // Default fallback responses if both API calls fail
    const fallbackResponse = language === 'hi' 
      ? "Maaf kijiye bahan, मुझे अभी कुछ तकनीकी दिक्कत हो रही है। लेकिन मैं आपकी हेल्थ के लिए हमेशा यहां हूँ। थोड़ी देर बाद फिर से पूछें या अपना सवाल दूसरे शब्दों में बताएं।" 
      : "I'm sorry sister, I'm experiencing some technical difficulties at the moment. But I'm always here for your health concerns. Please try again shortly or rephrase your question.";
    
    toast({
      title: "Connection issue",
      description: "Unable to reach Sangata's knowledge system",
      variant: "destructive",
    });
    
    return fallbackResponse;
  }
}
