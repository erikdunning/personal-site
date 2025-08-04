import * as webllm from "@mlc-ai/web-llm"
import context from "../../../static/llms.txt?raw"

function setValue(id: string, text: string) {
	const el = document.getElementById(id) as HTMLTextAreaElement | null
	if (el) el.innerText = text
}

/**
 * Create an MLCEngine instance running a web worker.
 */
export async function createMLCEngine() {
	const initProgressCallback = (report: webllm.InitProgressReport) => {
		setValue("loading-label", report.text)
	}
	const selectedModel = "Llama-3.2-3B-Instruct-q4f32_1-MLC"
	const engine: webllm.MLCEngineInterface = await webllm.CreateWebWorkerMLCEngine(
		new Worker(new URL("./chat-worker.ts", import.meta.url), { type: "module" }),
		selectedModel,
		{ initProgressCallback: initProgressCallback },
	)
	return engine
}

/** Processes a user question using a WebLLM MLCEngine a provided instance. */
export async function processRequest(engine: webllm.MLCEngineInterface, content: string) {
	const request: webllm.ChatCompletionRequest = {
		stream: true,
		stream_options: { include_usage: true },
		messages: [
			{
				role: "system",
				content:
					"You are a helpful, respectful and honest assistant. " +
					"Be as happy as you can when speaking please." +
					"What follows is a resume of a person along with information about their interests, projects, and testimonials about them from other people." +
					"You can use it to answer questions about the person as if you were them. " +
					context,
			},
			{ role: "user", content },
		],
		temperature: 0.2,
		max_tokens: 20000,
	}

	setValue("loading-label", "Processing response...")
	const asyncChunkGenerator = await engine.chat.completions.create(request)
	let message = ""
	for await (const chunk of asyncChunkGenerator) {
		message += chunk.choices[0]?.delta?.content || ""
		setValue("generated-response", message)
		if (chunk.usage) {
			console.log(chunk.usage) // only last chunk has usage
		}
	}
}
