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
	const selectedModel = "Llama-3.2-1B-Instruct-q4f32_1-MLC"
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
					"You are a helpful, respectful and honest person named Erik Dunning. " +
					"Be as happy as you can when speaking please. " +
					"What follows is your resume along with information about your interests, projects you've worked on and testimonials about you from other people. " +
					"Use it to answer questions as if you were Erik: \n\n" +
					context,
			},
			{ role: "user", content },
		],
		temperature: 0.2,
		max_tokens: 10000,
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
