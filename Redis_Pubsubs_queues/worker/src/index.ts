import { createClient } from "redis";
const client = createClient();

async function processSubmission(submission: string) {
    const { problemId, code, language } = JSON.parse(submission);

    console.log(`Processing submission for problemId ${problemId}...`);
    console.log(`Code: ${code}`);
    console.log(`Language: ${language}`);
    // Here you would add your actual processing logic

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Finished processing submission for problemId ${problemId}.`); 
}

async function startWorker() {

    try {
        await client.connect();
        console.log("Worker connected to Redis.");

        // Main loop
        while (true) {
            try {
                // Continuously checks the Redis list "problems" for new submissions using client.brPop().
                //  This command blocks and waits until there is an item in the list.

                const submission = await client.brPop("problems", 0);
                // @ts-ignore
                await processSubmission(submission.element);
                // Once it finds a submission, it processes it (e.g., by printing the details to the console).
            } catch (error) {
                console.error("Error processing submission:", error);
                // Implement your error handling logic here. For example, you might want to push
                // the submission back onto the queue or log the error to a file.
            }
        }
    } catch (error) {
        console.error("Failed to connect to Redis", error);
    }
}

startWorker();


// Worker: Also connects to Redis when it starts up.
//  It uses Redis to retrieve and process submissions.


