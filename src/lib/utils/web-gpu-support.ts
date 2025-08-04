export async function checkWebGPUSupport() {
	if (!("gpu" in navigator)) {
		console.log("WebGPU is not supported in this browser.")
		return false
	}

	try {
		const gpu = navigator.gpu as Record<string, () => unknown>
		const hasRequestAdapter = "requestAdapter" in gpu
		const adapter = hasRequestAdapter ? ((await gpu.requestAdapter()) as Record<string, () => unknown>) : false
		if (!adapter) {
			console.log("No WebGPU adapter found, or WebGPU is not enabled.")
			return false
		}

		const device = await adapter.requestDevice()
		if (!device) {
			console.log("Could not obtain a WebGPU device, or WebGPU is not enabled.")
			return false
		}

		console.log("WebGPU is supported and enabled!")
		return true
	} catch (error) {
		console.error("Error checking WebGPU support:", error)
		return false
	}
}
