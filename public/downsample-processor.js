class DownsampleProcessor extends AudioWorkletProcessor {
    static get parameterDescriptors() {
        return [
            {
                name: "inputSampleRate",
                defaultValue: 44100,
                minValue: 0,
                maxValue: 192000,
            },
            {
                name: "outputSampleRate",
                defaultValue: 16000,
                minValue: 0,
                maxValue: 192000,
            },
        ];
    }

    process(inputs, outputs, parameters) {
        const input = inputs[0][0];
        const output = outputs[0][0];
        const inputSampleRate = parameters.inputSampleRate[0];
        const outputSampleRate = parameters.outputSampleRate[0];
        const sampleRateRatio = inputSampleRate / outputSampleRate;
        const newLength = Math.round(input.length / sampleRateRatio);
        const result = new Float32Array(newLength);
        let offsetResult = 0;
        let offsetBuffer = 0;
        while (offsetResult < result.length) {
            const nextOffsetBuffer = Math.round(
                (offsetResult + 1) * sampleRateRatio
            );
            let accum = 0,
                count = 0;
            for (
                let i = offsetBuffer;
                i < nextOffsetBuffer && i < input.length;
                i++
            ) {
                accum += input[i];
                count++;
            }
            result[offsetResult] = accum / count;
            offsetResult++;
            offsetBuffer = nextOffsetBuffer;
        }
        output.set(result);
        return true;
    }
}

registerProcessor("downsample-processor", DownsampleProcessor);
