const axios = require("axios");

// Clave API de OpenAI (protége esta clave adecuadamente)
require('dotenv').config();
const apiKey = process.env.OPENAI_API_KEY;

// URL base de la API de OpenAI
const openaiApiUrl = "https://api.openai.com/v1/chat/completions";

// Función para realizar una consulta al modelo de OpenAI
async function chatGpt(pregunta) {
    try {
        const respuesta = await axios.post(
            openaiApiUrl, {
                model: "gpt-3.5-turbo", // Cambia a "gpt-4" si tienes acceso
                messages: [
                    { role: "system", content: "Eres un asistente útil y amigable." },
                    { role: "user", content: pregunta },
                ],
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`, // Encabezado de autorización
                },
            }
        );

        // Devuelve la respuesta del modelo
        return respuesta.data.choices[0].message.content.trim();
    } catch (error) {
        return `Error al procesar la solicitud: ${error.response?.data?.error?.message || error.message}`;
    }
}

// Bucle para interacción con el usuario
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log("Escribe 'quit', 'exit' o 'bye' para salir.");

function interactuar() {
    rl.question("Tú: ", async(userInput) => {
        if (["quit", "exit", "bye"].includes(userInput.toLowerCase())) {
            console.log("Chatbot: ¡Adiós!");
            rl.close();
            return;
        }

        const respuesta = await chatGpt(userInput);
        console.log("Chatbot:", respuesta);
        interactuar();
    });
}

interactuar();